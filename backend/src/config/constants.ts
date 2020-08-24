if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const config = {
    port: Number(process.env.APP_PORT) || 8080,
    infoMessage: process.env.INFO_MESSAGE || 'Info message is empty or not set.',
    logLevel: process.env.LOG_LEVEL || 'silly',
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        database: process.env.DB_NAME || 'app',
        user: process.env.DB_USER || 'app',
        password: process.env.DB_PASS || 'app',
        max: Number(process.env.DB_MAX_CLIENTS) || 20,
        idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS) || 30000
    }
};

export { config };
