<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

[NestJS](https://github.com/nestjs/nest) example REST API with Swagger integration.

Once the app is started, go to `http://localhost:<port>/docs/` to view the Swagger docs

Two folder structures are available:
* Group by type - [here](https://github.com/peadarkelly/nest-api/tree/group-by-type) (default)
* Group by module - [here](https://github.com/peadarkelly/nest-api/tree/group-by-module)

## Setup

```bash
$ npm install
```

Create Postgres database and set the following environment variables to the appropriate values:
* `PG_HOST`
* `PG_DATABASE`
* `PG_USER`
* `PG_PASSWORD`
* `PG_PORT`

Configure the `PORT` environment variable to chnage the Port that the app listens on (default 3001)

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# lint plus unit tests
$ npm test

# unit tests only
$ npm run test:unit

# integration tests
$ npm run test:integration
```
