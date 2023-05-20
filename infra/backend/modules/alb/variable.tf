variable "project" {}
variable "env" {}
variable "subnets" {}
variable "security_groups" {}
variable "internal" {
  default = false
}
variable "prefix" {
  default = ""
}
