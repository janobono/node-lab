# node lab

Just simple try to use node.js to create web application.

* [backend](./backend/README.md) - node backend
* [frontend](./frontend/README.md) - react frontend

## build

Run build shell script `./build.sh` or build `frontend` and `backend` separately.

## local run

`docker-compose` config for local running. All projects have to be built.

- default user: `jimbop`/`pass123`
- [backend - health check](http://localhost/api/node-lab-backend/health)
- [frontend](http://localhost)

### run all

```
docker-compose up -d
```

### run just db

```
docker-compose -f docker-compose-database-only.yaml up -d
```

### stop

```
docker-compose down
```
