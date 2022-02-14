/*
    We can use Interface instead of this abstract class and 'implements' both error with CustomError interface
    But we are using abstract Class, whose properties are:
    Abstract class can't be instansiated
        i.e we can't make object of this class with 'new' keyword
        used to set up requirements for subclasses

        'abstract' keyword used for the property that must be present in subclass.

        you can test
        class NotFoundError extends CustomError{}

    ** Now we have one upper hand of abstract class over interface is now CustormError is a subclass
    which have all of error requirements. se now if any of the error we wants to follow this modal
    that only should be subclass of CustomError instead of making subclass of 'Error' and implements with interface.
    Same we have done with DatabaseConnectionError and RequestValidationError
*/

export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        super(message)

        Object.setPrototypeOf(this, CustomError.prototype)
    }

    abstract serializeErrors(): {message: string; field?: string}[]
}

