# Under Armour Chat Service
[![Build Status](https://travis-ci.org/jewelsjacobs/underarmour-chat-service.svg?branch=master)](https://travis-ci.org/jewelsjacobs/underarmour-chat-service)

- Under Armour chat service [challenge](CHALLENGE.md)
- [API docs](http://html5devgal.com/underarmour-chat-service/index.html)

## Requirements

 - [Node v8.2+](https://nodejs.org/en/download/current/) or [Docker](https://www.docker.com/)
 - [Yarn](https://yarnpkg.com/en/docs/install)

## Getting Started

Clone the repo:

```bash
git clone https://github.com/jewelsjacobs/underarmour-chat-service
cd underarmour-chat-service
```

Install dependencies:

```bash
yarn
```

Set environment variables:

```bash
cp .env.example .env
```

## Running Locally

```bash
yarn dev
```

## Running in Production

```bash
yarn start
```

## Lint

```bash
# lint code with ESLint
yarn lint

# try to fix ESLint errors
yarn lint:fix

# lint and watch for changes
yarn lint:watch
```

## Test

```bash
# run all tests with Mocha
yarn test

# run unit tests
yarn test:unit

# run integration tests
yarn test:integration

# run all tests and watch for changes
yarn test:watch

# open nyc test coverage reports
yarn coverage
```

## Validate

```bash
# run lint and tests
yarn validate
```

## Logs

```bash
# show all logs
yarn logs

# show error logs
yarn logs:error
```

## Documentation

```bash
# generate and open api documentation
yarn docs
```

## Docker

```bash
# run container locally
yarn docker:dev
or
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# run container in production
yarn docker:prod
or
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

# run tests
yarn docker:test
or
docker-compose -f docker-compose.yml -f docker-compose.test.yml up
```

## Deploy

Rename `deploy-example.sh` to `deploy.sh`

Set your server ip:

```bash
DEPLOY_SERVER=127.0.0.1
```

In `deploy.sh`:
 - Replace `{docker-login}` with your docker hub login
 
In `.env`:

  - Add `MONGO_URI` with an external mongodb connection, Ie. `MONGO_URI=mongodb://login:pass@ds017688.mlab.com:17688/chat-service`
  
In `docker-compose.prod.yml`:

  - Replace the mongodb ports value with the port from the production mongodb.

Run deploy script:

```bash
yarn deploy
or
sh ./deploy.sh
```

## Inspirations

 - [Daniel Sousa's](https://github.com/danielfsousa) [Express ES2017 REST API Boilerplate](https://github.com/danielfsousa/express-rest-es2017-boilerplate)

## License

[MIT License](README.md) - 
