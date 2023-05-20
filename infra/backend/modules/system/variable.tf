variable "project" {
  default = "spa"
}
variable "db_name" {
  default = "spa"
}
variable "db_user_name" {
  default = "root"
}
variable "redis_port" {
  default = "6379"
}
variable "rds_multi_az" {
  default = "false"
}
variable "env" {}
variable "db_instance" {}
variable "db_storage" {}
variable "region" {}
variable "server_cpu" {}
variable "server_ram" {}
variable "sleepscore_cpu" {}
variable "sleepscore_ram" {}
variable "celery_cpu" {}
variable "celery_ram" {}
variable "beat_cpu" {}
variable "beat_ram" {}
variable "redis_instance" {}
variable "redis_clusters" {}
