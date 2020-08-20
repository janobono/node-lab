FROM node:12.18-alpine

ENV NODE_ENV="production" \
    INFO_MESSAGE="Node lab application backend is running from docker."

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 8080

CMD [ "node", "src/app.js" ]
