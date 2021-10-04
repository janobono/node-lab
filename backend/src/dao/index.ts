import { Sequelize } from 'sequelize';
import logger from '../logger';

const sequelize = new Sequelize(
    {
        logging: msg => logger.debug(msg),
        dialect: 'postgres',
        host: process.env.DB_HOST,
        // @ts-ignore
        port: +process.env.DB_PORT,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    });

export default sequelize;
