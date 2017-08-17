import 'isomorphic-fetch';
import qs from 'qs';
import * as formatter from './formatter';
import isFunction from 'lodash/isFunction';

let options = {};
let isInitialized = false;
let openConnections = new Set();

export default {
    init(opt) {
        validateOptions(opt);

        isInitialized = true;
        options = opt;
    },
    get: wrapHttpMethod('GET'),
    post: wrapHttpMethod('POST'),
    put: wrapHttpMethod('PUT'),
    remove: wrapHttpMethod('DELETE'),
};

function wrapHttpMethod(method) {
    return (pathname, data) => {
        if (!isInitialized) {
            throw new Error('Daiquiri API client is not initialized. Run `Daiquiri.init(options)` before making any API request.');
        }

        requestStarted();

        const {href, reqOptions} = getRequestOptions(method, pathname, data)

        const request = fetch(href, reqOptions)
            .then((res) => {
                requestEnded(request);

                return handleResponse(res, method);
            })
            .catch((err) => {
                console.error(err); // eslint-disable-line no-console
                requestEnded(request);
                throw err;
            });

        request.cancel = () => {
            // TODO: add support for request cancellation
            // see https://github.com/whatwg/fetch/issues/447
            // apiRequest.abort();
            requestEnded(request);
        };

        openConnections.add(request);

        return request;
    };
}

function getRequestOptions(method, pathname, data) {
    let href = `${options.apiServerUrl}/v1${pathname}`;

    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
        'x-access-token': options.apiKey,
    };

    const reqOptions = {method, headers};

    if (typeof data !== 'undefined') {
        const formattedData = formatter.toApiFormat(data);

        if (method === 'GET') {
            href += `?${qs.stringify(formattedData)}`;
        } else {
            reqOptions.body = formatter.toJSON(formattedData);
        }
    }

    return {
        reqOptions,
        href,
    };
}

function handleResponse(res, method) {
    return res.text()
        .then((json) => {
            let result;

            if (res.status === 400 || res.status === 401) {
                 const parsedJson = formatter.fromApiFormat(formatter.parseJSON(json));

                result = requestFailed(res.status, parsedJson, {type: method}) || parsedJson;

                return Promise.reject(result);
            } else if (res.status > 401) {
                result = requestFailed(res.status, {}, {type: method});

                return Promise.reject(result);
            }

            result = formatter.fromApiFormat(formatter.parseJSON(json));

            return result;
        });
}

function validateOptions(opt) {
    if (typeof opt !== 'object') {
        throw new Error('Options must be an object');
    }

    if (!opt.apiServerUrl) {
        throw new Error('\'apiServerUrl\' is required option');
    }

    if (!opt.apiKey) {
        throw new Error('\'apiKey\' is required option');
    }
}

function requestStarted() {
    if (isFunction(options.onRequestStarted)) {
        options.onRequestStarted();
    }
}

function requestEnded(request) {
    if (isFunction(options.onRequestEnded) && openConnections.has(request)) {
        options.onRequestEnded();
        openConnections.delete(request);
    }
}

function requestFailed(...args) {
    if (isFunction(options.onFail)) {
        return options.onFail(...args);
    }

    return undefined;
}
