import express, { NextFunction, Request, Response } from 'express';
import { config } from '../config/constants';
import logger from '../utils/logger';

const router = express.Router({
    strict: true
});

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    logger.debug(req.baseUrl);
    res.send({ message: config.infoMessage });
    next();
});

export { router };
