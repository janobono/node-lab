// DEVELOPMENT ENV
import APP_CONFIG from './config';

// IMPORTS
import express from 'express';
import logger from './logger';
import { dbCheck } from './db';
import authRouter from './api/route/auth-route';
import todoRouter from './api/route/todo-route';

logger.info('Server initialization...');

// DB
logger.info('DB check...');
dbCheck().then(result => {
    if (result) {
        logger.info('Db check OK')
    } else {
        logger.warn('Db check ERR')
        throw new Error('Db err');
    }
});

// APP
const app = express();
// - JSON PARSER
app.use(express.json());
// - CORS
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
// - AUTH
app.use(createRoute('auth'), authRouter);
// - TODOS
app.use(createRoute('todos'), todoRouter);
// - HEALTH
app.get(createRoute('health'), (req, res) => {
    res.status(200).end('OK');
});
// - 404
app.use((req, res) => {
    res.sendStatus(404);
});

// START SERVER
const server = app.listen(APP_CONFIG.APP_PORT, () => {
    logger.info(`Server running at port ${APP_CONFIG.APP_PORT}.`);
});
process.on('SIGTERM', () => {
    logger.debug('SIGTERM signal received: closing HTTP server')
    server.close(() => {
        logger.debug('Server closed')
    })
})
