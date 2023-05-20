variable "project" {}
variable "env" {}

variable "vpc_cidr_block" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.20.0.0/16"
}

variable "public_subnet_cidr_blocks" {
  description = "Available cidr blocks for public subnets."
  type        = list(string)
  default = [
    "10.20.1.0/24",
    "10.20.2.0/24",
    "10.20.3.0/24"
  ]
}

variable "private_subnet_cidr_blocks" {
  description = "Available cidr blocks for private subnets."
  type        = list(string)
  default = [
    "10.20.11.0/24",
    "10.20.12.0/24",
    "10.20.13.0/24"
  ]
}
