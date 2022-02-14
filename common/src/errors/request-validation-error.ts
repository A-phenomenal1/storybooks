import {ValidationError} from 'express-validator';
import { CustomError } from './custom-error';

/*
    We have two option here for pushing all subclass 
    of Error to must follow the structure modal that have statusCode
    serializeError method, without any typo.
    '?' in field shows that is optional key.

    We implement the class just like this
    interface CustomError {
        statusCode: number;
        serializeErrors(): {
            message: string;
            field?: string;
        }[];
    }
    // export class RequestValidationError extends Error implements CustomError

    another option is the abstract class in custom error
*/

export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super('Invalid request parameters');

        // Only because we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map(err => {
            return {message: err.msg, field: err.param};
        });
    }
}