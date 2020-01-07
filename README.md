# sample-pipeline

This project showcases a pipeline for a simple web app.

Project structure:

### API

Docker-compose file to setup hasura container with a postgresql container as the database

- needs env file

### Backend

Node.js backend, used to authenticate users and issue JWTs

- needs default.json config file

### Frontend

Create-react-app frontend

### Hasura

Contains migrations (tables, views, functions, relationships, permissions, remote chemas etc.) for Hasura

### Testcafe

End-to-end tests for registering and logging in

# Development config

1. Setup config
   - copy backend config file without example-addon `cp backend/config/default.example.json default.json`
     - change values to match your setup
   - copy api .env file `cp api/exampleEnv .env`
     - change values as needed
2. Run `docker-compose up`
3. Login to `http://localhost:8080/console`, create `user` and give it all permissions
4. Run `npm install`
5. You now have a Node.js auth server capable of
   1. Registering users (requires username, password, email)
   2. Logging in users (passwords hashed with bcrypt, 10 rounds of salt) - successful login returns JWT for quering GraphQL
6. You also now have a development version of Hasura serving a GraphQL API with PostgreSql as database

## Authentication flow

1. Log in with correct username and password using frontend
2. Credentials are sent to /api/user/auth route on the Node.js backend
   1. Backend checks credentials (username and hashed password) against GraphQL
   2. If credentials match, backend generates JWT
   3. This JWT is sent as a response
3. If frontend receives JWT, it is stored into local storage
4. From localstorage this JWT can be sent in every request to GraphQL to authenticate whether this user can have access to the particular data they are requesting

## Migrations

Create a working basic setup by applying migrations in this repo.

### Create migrations from current state

1. Disable Hasura console by changing HASURA_GRAPHQL_ENABLE_CONSOLE environment variable to false
2. Restart your Hasura server, `docker-compose up` if necessary
3. `hasura migrate create "init" --from-server`

### Apply migrations

1. Disable Hasura console by changing HASURA_GRAPHQL_ENABLE_CONSOLE environment variable to false
2. Restart your Hasura server, `docker-compose up` if necessary
3. Add admin secret as an environment variable `export HASURA_GRAPHQL_ADMIN_SECRET=<your-admin-secret>`

### Run tests

`cd testcafe`
`testcafe chrome register.js`