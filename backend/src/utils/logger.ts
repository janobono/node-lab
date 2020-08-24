import { Format } from 'logform';
import winston from 'winston';
import { config } from '../config/constants';

const { combine, timestamp, printf } = winston.format;

const logFormat: Format = printf((info) => `${info.timestamp} [${info.level}] ${info.message}`);

const logger = winston.createLogger({
    level: config.logLevel,
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
    transports: [new winston.transports.Console()]
});

export default logger;
