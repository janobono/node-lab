FROM node:lts-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npm run tsc

FROM node:lts-alpine as production

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY --from=development /usr/src/app/build ./build

CMD ["node", "./build/app.js"]
