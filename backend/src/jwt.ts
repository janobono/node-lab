import jwt, { Jwt, VerifyCallback } from 'jsonwebtoken';

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
