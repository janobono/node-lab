// DEVELOPMENT ENV
if ('production' !== process.env.NODE_ENV) {
    require('dotenv').config();
}

export const APP_CONFIG = {
    APP_LOG_LEVEL: process.env.APP_LOG_LEVEL || 'debug',
    APP_PORT: process.env.APP_PORT || '8080',
    APP_CONTEXT_PATH: process.env.APP_CONTEXT_PATH || '/api/node-lab-backend',
    DATABASE_URL: process.env.DATABASE_URL,
    TOKEN_ISSUER: process.env.TOKEN_ISSUER || 'node-lab',
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN || '1800s'
};

// IMPORTS
import express from 'express';
import logger from './logger';
import authRouter from './api/route/auth-route';
import todoRouter from './api/route/todo-route';

// APP
const app = express();

// JSON PARSER
app.use(express.json());

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// ROUTES
const createRoute = (path: string) => {
    return [APP_CONFIG.APP_CONTEXT_PATH ? APP_CONFIG.APP_CONTEXT_PATH : '', path].join('/');
}

// AUTH
app.use(createRoute('auth'), authRouter);

// TODOS
app.use(createRoute('todos'), todoRouter);

// HEALTH
app.get(createRoute('health'), (req, res) => {
    res.status(200).end('OK');
});

// 404
app.use((req, res) => {
    res.sendStatus(404);
});

// START SERVER
app.listen(APP_CONFIG.APP_PORT, () => {
    logger.debug(`Server running at port ${APP_CONFIG.APP_PORT}.`);
});
