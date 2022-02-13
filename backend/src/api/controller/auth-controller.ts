import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import APP_CONFIG from '../../config';
import { db } from '../../db';
import logger from '../../logger';
import { hashPassword, verifyPassword } from '../../password';
import { generateToken } from '../../jwt';

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('signIn');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }
    try {
        const {username, password, firstName, lastName, email} = req.body;

        const usersCount = await db.nl_user.count({
            where: {username}
        });

        if (usersCount === 0) {
            const password_ = await hashPassword(password);
            const user = await db.nl_user.create({
                data: {
                    username,
                    password: password_,
                    first_name: firstName,
                    last_name: lastName,
                    email
                }
            });
            const result = {
                username: user.username,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email
            };
            const token = generateToken(
                {...result},
                APP_CONFIG.TOKEN_SECRET!,
                {
                    issuer: APP_CONFIG.TOKEN_ISSUER,
                    expiresIn: APP_CONFIG.TOKEN_EXPIRES_IN
                }
            );
            res.status(201).json({bearer: token});
        } else {
            res.status(400).end(`User ${username} is already exists!`);
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json(error);
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('authenticate');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }
    try {
        const {username, password} = req.body;
        const user = await db.nl_user.findUnique({
            where: {username}
        });
        if (user) {
            const result = {
                username: user.username,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email
            };
            if (await verifyPassword(password, user.password)) {
                const token = generateToken(
                    {...result},
                    APP_CONFIG.TOKEN_SECRET!,
                    {
                        issuer: APP_CONFIG.TOKEN_ISSUER!,
                        expiresIn: APP_CONFIG.TOKEN_EXPIRES_IN!
                    }
                );
                res.status(200).json({bearer: token});
            } else {
                res.status(400).json({message: 'Invalid password!'});
            }
        } else {
            res.status(400).json({message: 'Invalid username!'});
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json(error);
    }
}
