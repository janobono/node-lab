FROM node:12.18-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM nginx:stable as production

COPY --from=development /usr/src/app/dist/node-lab-frontend /usr/share/nginx/html
