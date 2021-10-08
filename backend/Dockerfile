FROM node:lts-alpine As development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npm run tsc

FROM node:lts-alpine as production

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

COPY package*.json ./

RUN npm install --only=production

COPY --from=development /app/build ./build

USER nodejs

CMD ["node", "./build/app.js"]
