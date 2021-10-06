import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import logger from '../../logger';
import * as userRepository from '../../dao/repository/user-repository';
import { getUser, User } from '../../dao/repository/user-repository';
import { hashPassword, verifyPassword } from '../../password';
import { generateToken } from '../../jwt';

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('signIn', req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const user = req.body as User;
    try {
        const usersCount = await userRepository.countUsers(user.username);
        if (usersCount === '0') {
            const password = await hashPassword(user.password);
            const newUser = await userRepository.addUser({...user, password});
            const token = generateToken(
                {...newUser},
                process.env.TOKEN_SECRET!,
                {
                    issuer: process.env.TOKEN_ISSUER!,
                    expiresIn: process.env.TOKEN_EXPIRES_IN!
                }
            );
            return res.status(201).json({user: newUser, token});
        } else {
            return res.status(400).end(`User ${user.username} is already exists!`);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('authenticate', req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {username, password} = req.body;
    try {
        const usersCount = await userRepository.countUsers(username);
        if (usersCount === '1') {
            const user = await getUser(username);
            if (await verifyPassword(password, user.password)) {
                const token = generateToken(
                    {...user},
                    process.env.TOKEN_SECRET!,
                    {
                        issuer: process.env.TOKEN_ISSUER!,
                        expiresIn: process.env.TOKEN_EXPIRES_IN!
                    }
                );
                return res.status(200).json({user: user, token});
            } else {
                return res.status(400).json({message: 'Invalid password!'});
            }
        } else {
            return res.status(400).json({message: 'Invalid username!'});
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}
