# sample-pipeline

This project showcases a pipeline for a simple web app.

Project stack:

- Node.js backend with Express
- React frontend
- Circle CI for continuous integration
- AWS as the cloud platform

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

## Setup EC2 Bastion host

`sudo yum update`
`sudo yum install -y https://download.postgresql.org/pub/repos/yum/10/redhat/rhel-latest-x86_64/postgresql10-libs-10.7-2PGDG.rhel7.x86_64.rpm`
`sudo yum install -y https://download.postgresql.org/pub/repos/yum/10/redhat/rhel-latest-x86_64/postgresql10-10.7-2PGDG.rhel7.x86_64.rpm`
`sudo yum install -y https://download.postgresql.org/pub/repos/yum/10/redhat/rhel-latest-x86_64/postgresql10-server-10.7-2PGDG.rhel7.x86_64.rpm`
`sudo yum install -y postgresql10`

Connect to your ec2, then from the ec2 connect to your RDS instance:
`psql -h DB_HOSTNAME -p 5432 -U DB_USERNAME -W DB_NAME`
