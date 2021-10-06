/* eslint-disable @typescript-eslint/no-explicit-any */

export const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
}
export const parseStringValue = (value: any, label: string): string => {
    if(!value || !isString(value)) {
      throw new Error(`Incorrect or missing ${label}: ` + value);
    }
    return value;
}

export const isNumber = (num: any): num is number => {
    return typeof num === 'number' && !isNaN(num);
}
export const parseNumberValue = (value: any, label: string): number => {
    if(!value || !isNumber(value)) {
        throw new Error(`Incorrect or missing ${label}: ` + value);
    }
    return value;
}

export const parseIdValue = (value: any): string => {
    if(!value || !value.id || !isString(value.id))
        throw new Error(`Incorrect or missing token ${value}`);
    return value.id;
}