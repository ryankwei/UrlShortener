/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import { NewLink, NewUser, UpdateLink } from '../types';
import { parseStringValue, parseIdValue, isString, isNumber } from './parseValues';
import { config } from './config';

export const toNewLink = (object: any): NewLink => {
    const numReached = isNumber(object.numReached) ? object.numReached : 0;
    const newLink: NewLink = {
        fromLink: parseStringValue(object.fromLink, 'from link'),
        toLink: parseStringValue(object.toLink, 'to link'),
        numReached: numReached,
    };
    return newLink;
}

export const toUpdateLink = (object: any): UpdateLink => {
    const updateLink: UpdateLink = {
        fromLink: isString(object.fromLink) ? object.fromLink : undefined,
        toLink: isString(object.toLink) ? object.toLink : undefined,
        numReached: isNumber(object.numReached) ? object.numReached : undefined
    }
    return updateLink;
}

export const toNewUser = (object: any): NewUser => {
    const newUser: NewUser = {
        username: parseStringValue(object.username, 'username'),
        name: parseStringValue(object.name, 'name'),
        password: parseStringValue(object.password, 'password')
    };
    return newUser;
}


export const validateToken = (object: any) => {
    const authorization = parseStringValue(object, 'auth token');
    const decodedToken = jwt.verify(authorization.substring(7), config.SECRET);
    return parseIdValue(decodedToken);
}

export const validateCredentials = (object: any) => {
    return {
        username: parseStringValue(object.username, 'username'),
        password: parseStringValue(object.password, 'password')
    }
}