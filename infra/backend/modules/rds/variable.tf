variable "subnetIds" {}
variable "project" {}
variable "env" {}
variable "allocated_storage" {}
variable "max_allocated_storage" {}
variable "instance_class" {}
variable "username" {}
variable "password" {}
variable "db_name" {}
variable "vpc_security_group_ids" {}
variable "multi_az" {
  default = "false"
}
variable "performance_insights_enabled" {}
