// DEVELOPMENT ENV
if ('production' !== process.env.NODE_ENV) {
    require('dotenv').config();
}

console.log('Config initialization...');

const APP_PORT = process.env.APP_PORT || '8080';
console.log('APP_PORT set to ' + APP_PORT);

const APP_LOG_LEVEL = process.env.APP_LOG_LEVEL || 'debug';
console.log('APP_LOG_LEVEL set to ' + APP_LOG_LEVEL);

const APP_CONTEXT_PATH = process.env.APP_CONTEXT_PATH || '/api/node-lab-backend';
console.log('APP_CONTEXT_PATH set to ' + APP_CONTEXT_PATH);

const TOKEN_ISSUER = process.env.TOKEN_ISSUER || 'node-lab';
console.log('TOKEN_ISSUER set to ' + TOKEN_ISSUER);

const TOKEN_SECRET = process.env.TOKEN_SECRET;
if (!TOKEN_SECRET) {
    console.log('TOKEN_SECRET must be set');
    throw new Error('TOKEN_SECRET must be set');
}
console.log('TOKEN_SECRET set to ' + TOKEN_SECRET);

const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || '8h';
console.log('TOKEN_EXPIRES_IN set to ' + TOKEN_EXPIRES_IN);

// CONFIG
const APP_CONFIG = {
    APP_PORT,
    APP_LOG_LEVEL,
    APP_CONTEXT_PATH,
    TOKEN_ISSUER,
    TOKEN_SECRET: TOKEN_SECRET || '',
    TOKEN_EXPIRES_IN
};

export default APP_CONFIG;
