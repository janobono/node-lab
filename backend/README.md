# node lab backend

Node lab backend service.

***tech stack***

* [Node.js](https://nodejs.org)
* [Express.js](https://expressjs.com/)
* [Docker](https://www.docker.com)

***environment variables (.env file)***

|Name|Default value|Description|
|---|---|---|
|APP_PORT|8000|server port|
|INFO_MESSAGE|Info message is empty or not set.|info message|

***endpoints - !!!must be replaced by OpenAPI doc!!!***

|Path=`/api/node-lab-backend`+|Description|
|---|---|
|`/info`|health check message endpoint|

## Build

### Docker

To build with docker just docker needed nothing more. There is a bash script `build.sh` which should do the job or use command:

```bash
docker build -t janobono/node-lab-backend .
```

### Local tools

Node.js local installation needed.

#### Installation

```bash
npm install
```

#### Running the app

```bash
# watch mode
npm run start:dev

# production mode
npm run start:prod
```
