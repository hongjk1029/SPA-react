output "vpc_id" {
  value = module.vpc.vpc_id
}

output "private_subnets" {
  value = module.vpc.private_subnets
}

output "public_subnets" {
  value = module.vpc.public_subnets
}

output "nat_ids" {
  value = module.vpc.nat_ids
}

output "nat_public_ips" {
  value = module.vpc.nat_public_ips
}

output "zones" {
  value = data.aws_availability_zones.singapore_azs.names
}
