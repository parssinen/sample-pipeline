## AWS Infrastructure setup

- create custom vpc
  - add atleast two subnets from atleast two different az's to that vpc
- create ecr repo for custom node auth backend
- create ecs task definition, use fargate
- create rds postgresql instance into same vpc as previous ecs
- create parameters in parameter store for hasura
  - get database url arn using aws cli `aws ssm get-parameters --names "HASURA_GRAPHQL_DATABASE_URL"`
- create new policy 
  - allow to get parameters from *insert arn for parameters with a wild card*
- attach said policy to ecsTaskExecutionRole

## Setup EC2 Bastion host

`sudo yum update`
`sudo yum install -y https://download.postgresql.org/pub/repos/yum/10/redhat/rhel-latest-x86_64/postgresql10-libs-10.7-2PGDG.rhel7.x86_64.rpm`
`sudo yum install -y https://download.postgresql.org/pub/repos/yum/10/redhat/rhel-latest-x86_64/postgresql10-10.7-2PGDG.rhel7.x86_64.rpm`
`sudo yum install -y https://download.postgresql.org/pub/repos/yum/10/redhat/rhel-latest-x86_64/postgresql10-server-10.7-2PGDG.rhel7.x86_64.rpm`
`sudo yum install -y postgresql10`

Connect to your ec2, then from the ec2 connect to your RDS instance:
`psql -h DB_HOSTNAME -p 5432 -U DB_USERNAME -W DB_NAME`
