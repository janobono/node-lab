import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import logger from '../../logger';

export const signIn = (req: Request, res: Response, next: NextFunction) => {
    logger.debug('signIn', req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    // TODO
    throw 'Not implemented yet!';
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    logger.debug('authenticate', req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    // TODO
    throw 'Not implemented yet!';
}
