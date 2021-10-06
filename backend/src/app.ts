// DEVELOPMENT ENV
if ('production' !== process.env.NODE_ENV) {
    require('dotenv').config();
}

// IMPORTS
import express from 'express';
import logger from './logger';
import sequelize from './dao';
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
    return [process.env.APP_CONTEXT_PATH ? process.env.APP_CONTEXT_PATH : '', path].join('/');
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
app.listen(process.env.APP_PORT, () => {
    logger.debug(`Server running at port ${process.env.APP_PORT}.`);
});

sequelize.authenticate()
    .then(() => logger.debug('Connection has been established successfully.'))
    .catch(error => {
        logger.error('Unable to connect to the database:', error);
        process.exit(-1);
    });
