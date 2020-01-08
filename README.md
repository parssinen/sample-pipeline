# Sample-pipeline

Sample-pipeline is a simple register/sign-in webapp that allows anyone to quickly start developing the rest of the app.

Sample-pipeline contains following components
* Hasura GraphQL API
* PostgreSQL database
* Node.js backend auth service
* Create-react-app frontend

# Prerequisites

Sample-pipeline was developed using the following versions, most probably works on older versions
* Node 12.10.0
* React 16.12.0

# Installing Sample-pipeline

Linux and macOS:

1. Clone the repo for yourself by running `git clone https://github.com/parssinen/sample-pipeline.git`
2. Setup configuration
  - copy backend config file without example-addon `cp backend/config/default.example.json default.json`
    - change values to match your setup
  - copy hasura's .env file `cp api/exampleEnv .env`
    - change values as needed
3. Run `docker-compose up` to start hasura and postgresql docker containers
4. Login to `http://localhost:8080/console`, create `user` and give it all permissions
  - Alternatively [apply migrations](##Migrations)
5. Initialize the backend service by going into backend directory and running `npm install` to install dependencies
6. Run the service `npm start`
  - You now have a Node.js auth server capable of
    1. Registering users (requires username, password, email)
    2. Logging in users (passwords hashed with bcrypt, 10 rounds of salt) - successful login returns JWT for quering GraphQL
7. You also now have a development version of Hasura serving a GraphQL API with PostgreSql as database
8. Go into frontend directory and install it's dependencies `npm install`
9. Start up the frontend developement verison `npm start`



Windows:
```
Not available.
```
# Using Sample-pipeline


## Migrations

Migrations include information about tables, data relationships, permissions etc.
Create a working basic setup by applying migrations included in this repo.

### Create migrations from current state

1. Disable Hasura console by changing HASURA_GRAPHQL_ENABLE_CONSOLE environment variable to false
2. Restart your Hasura server, `docker-compose up` if necessary
3. `hasura migrate create "init" --from-server`

### Apply migrations

1. Disable Hasura console by changing HASURA_GRAPHQL_ENABLE_CONSOLE environment variable to false
2. Restart your Hasura server, `docker-compose up` if necessary
3. Add admin secret as an environment variable `export HASURA_GRAPHQL_ADMIN_SECRET=<your-admin-secret>`


## Deployment

This application can be deployed to [AWS](AWS.md).

## Tests

```
cd sample-pipeline/backend
npm test

cd sample-pipeline/testcafe
testcafe chrome register.js
```