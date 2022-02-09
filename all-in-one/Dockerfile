# Setup all node_modules
FROM node:16-alpine as deps

WORKDIR /app

ADD ./prisma ./prisma
ADD package.json package-lock.json ./
RUN npm install --production=false
RUN npx prisma generate

# Setup production node_modules
FROM node:16-alpine as production-deps

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
ADD package.json package-lock.json ./
RUN npm prune --production

# Build the app
FROM node:16-alpine as build

ENV NODE_ENV=production

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules

ADD . .
RUN npm run build

# Build production image
FROM node:16-alpine as prod

ENV NODE_ENV=production
ENV PORT=80

WORKDIR /app

COPY --from=production-deps /app/node_modules /app/node_modules

COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public
ADD . .

EXPOSE 80

CMD ["npm", "run", "start"]
