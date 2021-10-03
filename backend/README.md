# node-lab-backend

rest api deployed as docker image

***tech stack***

* [Node.js](https://nodejs.org)
* [Express.js](https://expressjs.com/)
* [Docker](https://www.docker.com)

## build

Use `build.sh` bash script or docker command:

```shell
docker build -t janobono/node-lab-backend .
```

## environment variables

For development purposes use `.env` file. In production set environment variables

|Name|Default value|Description|
|---|---|---|
|APP_PORT|8080|server port|
|CONTEXT_PATH||All routes prefix for example `/api`|
## project

https://express-validator.github.io/docs/index.html

# Node Lab Backend - Project setup

## Init project

```
yarn init
```

## TypeScript

```
yarn add typescript --dev
```

### Config

```
yarn tsc --init
```

generated `tsconfig.json` more info [here](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "rootDir": "./src",
    "moduleResolution": "node",
    "outDir": "./build",
    "removeComments": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

## Node typescript support

```
yarn add @types/node --dev
```

## Install Express

```
yarn add express && yarn add @types/express --dev
```

## Nodemon

```
yarn add nodemon ts-node --dev
```

## Dotenv

```
yarn add dotenv --dev
```

package needed to use `.env` file

## Winston

```
npm i -S winston @types/winston
```

[docs](https://github.com/winstonjs/winston)

## build

build:

```
docker build -t janobono/node-lab-backend .
```

run:

```
docker run --name node-lab-backend --rm -p 8080:8080 janobono/node-lab-backend:latest
```

stop:

```
docker container stop node-lab-backend
```

# Node Lab Backend - end points

***endpoints - !!!must be replaced by OpenAPI doc!!!***

|Path=`/api/node-lab-backend`+|Description|
|---|---|
|`/info`|health check message endpoint|
