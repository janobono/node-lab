import winston from 'winston';

const logger = winston.createLogger({
    level: process.env.APP_LOG_LEVEL,
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({format: winston.format.simple()})
    ],
});

export default logger;
