variable "region" {
  description = "Used AWS region"
  default     = "eu-west-1"
}

variable "az_count" {
  description = "How many availibility zones to deploy to"
  default     = 2
}

variable "environment" {
  description = "Environment"
  default     = "dev"
}

variable "domain" {
  description = "Use domain"
  default     = "nuot.io"
}

variable "hasura_access_key" {
  description = "Access key for Hasura service"
}

variable "rds_username" {
  description = "Username for database service"
  default     = "postgres"
}

variable "hasura_jwt_secret" {
  description = "Secret for generating JSON Web Tokens"
}

variable "rds_password" {
  description = "Passoword for databse service"
}

variable "aws-profile" {
  description = "Which AWS profile to use"
  default     = "terraform-lauri"
}
