module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "${var.project}-${var.env}-vpc"
  cidr = var.vpc_cidr_block

  azs             = data.aws_availability_zones.singapore_azs.names
  public_subnets  = var.public_subnet_cidr_blocks
  private_subnets = var.private_subnet_cidr_blocks

  enable_nat_gateway     = false
  enable_vpn_gateway     = false
  one_nat_gateway_per_az = false
  single_nat_gateway = false

  tags = {
    Terraform   = "true"
    Environment = var.env
  }
}

data "aws_availability_zones" "singapore_azs" {
  state = "available"
}
