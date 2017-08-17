import snakeCase from 'lodash/snakeCase';
import camelCase from 'lodash/camelCase';
import moment from 'moment';

// inspired by http://erraticdev.blogspot.com.by/2010/12/converting-dates-in-json-strings-using.html
const fullDateISORegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:[.,]\d+)?Z$/i;

export const toApiFormat = dto => convertPropertyNames(dto, snakeCase);
export const fromApiFormat = dto => convertPropertyNames(dto, camelCase);

export const toJSON = (data, space) => JSON.stringify(data, null, space);
export const parseJSON = (data) => JSON.parse(data, parseValues);

// inspired by http://stackoverflow.com/a/26215431/938193
function convertPropertyNames(obj, converter) {
    let convertedObj;

    if (Array.isArray(obj)) {
        convertedObj = obj.map(el => convertPropertyNames(el, converter));
    } else if (Object.prototype.toString.call(obj) === '[object Object]') {
        // convert custom objects only, not Date, etc.
        convertedObj = {};
        for (const key of Object.keys(obj)) {
            const destKey = (key || '').replace(/[^.\][]+/g, converter);
            const value = obj[key];

            convertedObj[destKey] = convertPropertyNames(value, converter);
        }
    } else {
        convertedObj = obj;
    }

    return convertedObj;
}

function parseValues(key, value) {
    let parsedValue = value;

    if (typeof (value) === 'string' && fullDateISORegExp.test(value)) {
        parsedValue = moment(value).toDate();
    }

    return parsedValue;
}
