# node-lab-backend

Simple backend node RestApi application.

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

| Name             | Description                                                             | Default                 |
|------------------|-------------------------------------------------------------------------|-------------------------|
| NODE_ENV         | application profile in production must be set to `production`           |                         |
| APP_LOG_LEVEL    | possible values  `error`/`warn`/`info`/`http`/`verbose`/`debug`/`silly` | `debug`                 |
| APP_PORT         | server port                                                             | `8080`                  |
| APP_CONTEXT_PATH | All routes prefix                                                       | `/api/node-lab-backend` |
| DATABASE_URL     | postgresql://{user}:{password}@{host}:{port}/{db}?schema=public         |                         |
| TOKEN_ISSUER     | token issuer                                                            | `node-lab`              |
| TOKEN_SECRET     | token secret, can be generated via `new-token` node script              |                         | 
| TOKEN_EXPIRES_IN | token expiration                                                        | `8h`                    |

## endpoints

| Path=`/api/node-lab-backend`+ | Description   |
|-------------------------------|---------------|
| GET `/health`                 | health check  |
| POST `/auth/authenticate`     | authenticate  |
| POST `/auth/sign-in`          | sign in       |
| GET `/todos`                  | get all todos |
| GET `/todos/:id`              | get todo      |
| POST `/todos`                 | add todo      |
| PUT `/todos/:id`              | set todo      |
| DELETE `/todos/:id`           | delete todo   |

## dev

- Look in docker directory and start just db.
- Create `.env` file set:
    - `DATABASE_URL="postgresql://app:app@localhost:5432/app?schema=public"`
    - `TOKEN_SECRET=b0bb3ad766eda5bb6ac1e9af603c99cda01f05865048c858a92bbbdb9b2f72b72d6ae7ed0b707e30177e1708708ad73bfbf32499966a36300787b989333ee424`
        - Generate token `yarn new-token`
- Start dev server `npm run dev`

### health check

```
curl --request GET http://localhost:8080/api/node-lab-backend/health
```

result:

```
OK
```

### authenticate

```
curl --header "Content-Type: application/json" \
--request POST \
--data '{"username":"jimbop","password":"pass123"}' \
http://localhost:8080/api/node-lab-backend/auth/authenticate
```

result:

```json
{
  "bearer": "eyJ..."
}
```

### sign-in

```
curl --header "Content-Type: application/json" \
--request POST \
--data '{"username": "test","password":"test123","firstName":"Teston","lastName":"Tester","email":"test@test.com"}' \
http://localhost:8080/api/node-lab-backend/auth/sign-in
```

result:

```json
{
  "bearer": "eyJ..."
}
```

### GET todos

```
curl --request GET http://localhost:8080/api/node-lab-backend/todos
```

result:

```json
[
  {
    "id": 1,
    "title": "test01",
    "content": "Just test TODO - 1"
  },
  {
    "id": 2,
    "title": "test02",
    "content": "Just test TODO - 2"
  }
]
```

### GET todos/:id

```
curl --header "Content-Type: application/json" \
--header "Authorization: Bearer {token}" \
--request GET \
http://localhost:8080/api/node-lab-backend/todos/1
```

result:

```json
{
  "id": 1,
  "title": "test01",
  "content": "Just test TODO - 1"
}
```

### POST todos

```
curl --header "Content-Type: application/json" \
--header "Authorization: Bearer {token}" \
--request POST \
--data '{"content":"this is test todo","title":"test your life"}' \
http://localhost:8080/api/node-lab-backend/todos
```

result:

```json
{
  "id": 3,
  "title": "test your life",
  "content": "this is test todo"
}
```

### PUT todos/:id

```
curl --header "Content-Type: application/json" \
--header "Authorization: Bearer {token}" \
--request PUT \
--data '{"content":"this is modified test todo","title":"test your life 2"}' \
http://localhost:8080/api/node-lab-backend/todos/3
```

result:

```json
{
  "id": 3,
  "title": "test your life 2",
  "content": "this is modified test todo"
}
```

### DELETE todos/:id

```
curl --header "Content-Type: application/json" \
--header "Authorization: Bearer {token}" \
--request DELETE \
http://localhost:8080/api/node-lab-backend/todos/3
```

result:

```json
{
  "id": 3,
  "title": "test your life 2",
  "content": "this is modified test todo"
}
```
