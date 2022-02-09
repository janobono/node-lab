import { compare, hash } from 'bcryptjs';
import jwt, { Jwt } from 'jsonwebtoken';
import { json } from 'remix';
import APP_CONFIG from '~/utils/config.server';

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
    const result: Jwt | null = jwt.decode(token, {complete: true});
    if (result) {
        return result.payload as Payload;
    }
    throw 'Token decode error!';
}

export const checkToken = (request: Request): { response?: Response, payload?: Payload } => {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader ? authHeader.split(' ')[1] : null;
    if (token) {
        try {
            const result = jwt.verify(token, APP_CONFIG.TOKEN_SECRET as string, {complete: true});
            return {payload: result.payload as Payload};
        } catch (error) {
            return {response: json({message: 'Forbidden', error}, 403)};
        }
    }
    return {response: json({message: 'Unauthorized'}, 401)};
}

export const hashPassword = async (password: string) => {
    return await hash(password, 12);
}

export const verifyPassword = async (password: string, hashedPassword: string) => {
    return await compare(password, hashedPassword);
}
