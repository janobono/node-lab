# Node Lab Backend - Build

## Docker

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

## Local tools

Node.js local installation needed.

### Install packages

```
npm install
```

### Code format

```
npm run code:format
```

### Code check

```
npm run code:check
```

### Build

```
npm run build
```

### Run

```
# watch mode
npm run start:dev

# production mode
npm run start:prod
```
