# node-lab-backend

* [Node.js](https://nodejs.org)
* [Express.js](https://expressjs.com/)
* [Docker](https://www.docker.com)

## build

Use `build.sh` bash script or docker command:

```shell
docker build -t janobono/node-lab-backend .
```

## environment variables

For development purposes use `.env` file. In production set environment variables.

|Name|Description|
|---|---|
|NODE_ENV|application profile in production must be set to `production`|
|APP_PORT|server port for example `8080`|
|APP_CONTEXT_PATH|All routes prefix for example `/api/node-lab-backend`|
|DB_HOST|database host|
|DB_PORT|database port|
|DB_NAME|database name|
|DB_USER|database user|
|DB_PASSWORD|database user|
|TOKEN_ISSUER|token issuer for example `node-lab`|
|TOKEN_SECRET|token secret, can be generated via `new-token` node script|
|TOKEN_EXPIRES_IN|token expiration for example `1800s`|

## endpoints

|Path=`/api/node-lab-backend`+|Description|
|---|---|
|GET `/health`|health check|
|GET `/todos`|all todos endpoint|
|GET `/todo/:id`|get todo endpoint|
|GET `/health`|health check message endpoint|
|GET `/health`|health check message endpoint|
|GET `/health`|health check message endpoint|
