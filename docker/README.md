# docker

`docker-compose` config for local running. All projects have to be built.

- default user: `jimbop`/`pass123`
- [backend](http://localhost/api/node-lab-backend/health)
- [frontend](http://localhost)
- [CRA](http://localhost/all-in-one)

## run all

```
docker-compose up -d
```

## run just db

```
docker-compose -f docker-compose-database-only.yaml up -d
```

## stop

```
docker-compose down
```
