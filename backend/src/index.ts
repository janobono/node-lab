import express, { Application } from 'express';
import * as bodyParser from 'body-parser';
import { config } from './config/constants';
import { router } from './routes';
import logger from './utils/logger';
import postgreSQL from './db';

function startServer () {
    const app: Application = express();
    app.use(bodyParser.json());

    app.use('/api/node-lab-backend', router);

    // Start server
    app.listen(config.port, () => logger.info(`Running on http://localhost:${config.port}!`));
}

postgreSQL.query('SELECT CURRENT_TIMESTAMP', []).then(result => {
    startServer();
}).catch(err => {
    logger.error(err);
    startServer();
});
