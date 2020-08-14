# node lab backend

Node lab backend service.

***tech stack***

* [Node.js](https://nodejs.org)
* [Nest](https://github.com/nestjs/nest)
* [Docker](https://www.docker.com)

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
$ npm install
```

#### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

#### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
