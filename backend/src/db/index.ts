import { Pool } from 'pg';
import { config } from '../config/constants';

const pool = new Pool({
    host: config.db.host,
    port: config.db.port,
    database: config.db.database,
    user: config.db.user,
    password: config.db.password,
    max: config.db.max,
    idleTimeoutMillis: config.db.idleTimeoutMillis
});

export default { query: (text: string, params: any) => pool.query(text, params) };
