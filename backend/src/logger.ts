import winston from 'winston';
import { APP_CONFIG } from './app';

const logger = winston.createLogger({
    level: APP_CONFIG.APP_LOG_LEVEL,
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({format: winston.format.simple()})
    ],
});

export default logger;
