import requestBuilder from './request.builder';
import * as thread from './endpoints/thread';

export default {
    init: requestBuilder.init,
    thread: wrapApiEndpoint(thread),
};

function wrapApiEndpoint(endpoint) {
    let wrappedEndpoint = {};

    for (let actionName of Object.keys(endpoint)) {
        wrappedEndpoint[actionName] = wrapApiAction(endpoint[actionName]);
    }

    return wrappedEndpoint;
}

function wrapApiAction(apiAction) {
    return (...args) => apiAction(requestBuilder, ...args);
}