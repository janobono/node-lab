import express from 'express';

import todoRouter from './api/route/todo-route';

// DEVELOPMENT ENV
if ('production' !== process.env.NODE_ENV) {
    require('dotenv').config();
}

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
    const CONTEXT_PATH = process.env.CONTEXT_PATH ? process.env.CONTEXT_PATH : '';
    return [CONTEXT_PATH, path].join('/');
}

// TODOS
app.use(createRoute('todos'), todoRouter);

// HEALTH
app.get(createRoute('health'), (req, res, next) => {
    res.status(200).send('OK').end();
});

// 404
app.use((req, res, next) => {
    res.status(404).send('Route not found!').end();
});

// START SERVER
const PORT = process.env.APP_PORT ? process.env.APP_PORT : '8080';
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}.`);
});

// CLEAN UP
