// DEVELOPMENT ENV
if ('production' !== process.env.NODE_ENV) {
    require('dotenv').config();
}

// CONFIG
export const APP_CONFIG = {
    TOKEN_ISSUER: process.env.TOKEN_ISSUER || 'node-lab',
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN || '1800s'
};

export default APP_CONFIG;
