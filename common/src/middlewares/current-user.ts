import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string,
    email: string,
}

//This tells typescript that Request interface which
// exist before in express "may or may not" have currentUser property
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // !req.session?.jwt => !req.session || !req.session.jwt
    if(!req.session?.jwt){
        return next();
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = payload
    } catch (error) {}

    next();
};