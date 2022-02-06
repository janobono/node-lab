import jwt, { Jwt, VerifyCallback } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import { APP_CONFIG } from './app';

export interface Payload {
    username: string,
    firstName: string,
    lastName: string,
    email: string
}

export interface Options {
    issuer: string,
    expiresIn: string
}

export const generateToken = (payload: Payload, secret: string, options: Options): string => {
    return jwt.sign(payload, secret, options);
}

export const decodeToken = (token: string): Payload => {
    const result: Jwt | null = jwt.decode(
        token, {
            complete: true
        });
    if (result === null) {
        throw 'Token decode error!';
    }
    return result.payload as Payload;
}

export const verifyToken = (token: string, secret: string, callback: VerifyCallback) => {
    jwt.verify(token, secret, callback);
}

export const checkTokenHandler = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    verifyToken(token, APP_CONFIG.TOKEN_SECRET as string, (err, payload) => {
        if (err) {
            return res.sendStatus(403);
        }
        // @ts-ignore
        req.payload = {...payload} as Payload;
        next();
    })
}
