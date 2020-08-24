FROM node:12.18-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY tsconfig.json ./
COPY .eslintrc.json ./
COPY src ./src

RUN npm run code:check && npm run build

FROM node:12.18-alpine as production

ENV NODE_ENV=production \
    APP_PORT=8080 \
    INFO_MESSAGE="Hello world!" \
    LOG_LEVEL=info \
    DB_HOST=localhost \
    DB_PORT=5432 \
    DB_NAME=app \
    DB_USER=app \
    DB_PASS=app \
    DB_MAX_CLIENTS=20 \
    DB_IDLE_TIMEOUT_MS=30000

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY --from=development /usr/src/app/build ./build

EXPOSE 8080

CMD ["node", "./build/index.js"]
