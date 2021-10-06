FROM node:lts-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM nginx:stable as production

COPY --from=development /usr/src/app/build /usr/share/nginx/html
