# All In One

Both Frontend and Backend in one application created with [remix.run](https://remix.run) framework.

## build

Use `build.sh` bash script or docker command:

```shell
docker build -t janobono/node-lab-all-in-one .
```

## environment variables

For development purposes use `.env` file. In production set environment variables.

| Name             | Description                                                     | Default                 |
|------------------|-----------------------------------------------------------------|-------------------------|
| NODE_ENV         | application profile in production must be set to `production`   |                         |
| DATABASE_URL     | postgresql://{user}:{password}@{host}:{port}/{db}?schema=public |                         |
| TOKEN_ISSUER     | token issuer                                                    | `node-lab`              |
| TOKEN_SECRET     | token secret                                                    |                         | 
| TOKEN_EXPIRES_IN | token expiration                                                | `1800s`                 |

## endpoints

| Path=`/all-in-one/api/node-lab-backend`+ | Description   |
|------------------------------------------|---------------|
| GET `/health`                            | health check  |
| POST `/auth/authenticate`                | authenticate  |
| POST `/auth/sign-in`                     | sign in       |
| GET `/todos`                             | get all todos |
| GET `/todos/:id`                         | get todo      |
| POST `/todos`                            | add todo      |
| PUT `/todos/:id`                         | set todo      |
| DELETE `/todos/:id`                      | delete todo   |

## dev

- Look in docker directory and start just db.
- Create `.env` file set:
    - `DATABASE_URL="postgresql://app:app@localhost:5432/app?schema=public"`
    - `TOKEN_SECRET=b0bb3ad766eda5bb6ac1e9af603c99cda01f05865048c858a92bbbdb9b2f72b72d6ae7ed0b707e30177e1708708ad73bfbf32499966a36300787b989333ee424`
- Start dev server `npm run dev`

### authenticate

```
curl --header "Content-Type: application/json" \
--request POST \
--data '{"username":"jimbop","password":"pass123"}' \
http://localhost:3000/all-in-one/api/node-lab-backend/auth/authenticate
```

curl --header "Content-Type: application/json" \
--header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImppbWJvcCIsImZpcnN0TmFtZSI6IkppbWJvIiwibGFzdE5hbWUiOiJQeXRsaWsiLCJlbWFpbCI6ImppbWJvLnB5dGxpa0BhbnltYWlsLm9yZyIsImlhdCI6MTY0NDQzNTQ3NywiZXhwIjoxNjQ0NDM3Mjc3LCJpc3MiOiJub2RlLWxhYiJ9.l7qr88ck0IIC62MMLXH3-gKj14-Rw9OyuVd6h2Ao_0c" \
--request PUT \
--data '{"content":"hello","title":"jimbo"}' \
http://localhost:3000/all-in-one/api/node-lab-backend/todos/15

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImppbWJvcCIsImZpcnN0TmFtZSI6IkppbWJvIiwibGFzdE5hbWUiOiJQeXRsaWsiLCJlbWFpbCI6ImppbWJvLnB5dGxpa0BhbnltYWlsLm9yZyIsImlhdCI6MTY0NDQzNTQ3NywiZXhwIjoxNjQ0NDM3Mjc3LCJpc3MiOiJub2RlLWxhYiJ9.l7qr88ck0IIC62MMLXH3-gKj14-Rw9OyuVd6h2Ao_0c
