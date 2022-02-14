import {Request, Response, NextFunction } from "express";

import { CustomError } from "../errors/custom-error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    /*
        Now we shouldn't check the coming error is either instance of which Error(request-validation
        or database-connection error) instead we only have to check that is it instance of Custom Error.

        *** All this done for this middleware get a same modal structure of error
            so we use with all the services.
    */
    if(err instanceof CustomError){
        return res.status(err.statusCode).send({errors: err.serializeErrors()});
    }

    res.status(400). send({
        errors: [
            {
                message: 'Something went wrong!'
            }
        ]
    });
};