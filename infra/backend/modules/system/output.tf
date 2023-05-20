output "vpc_id" {
  description = "ID of project VPC"
  value       = module.vpc.vpc_id
}

output "private_subnets" {
  value = module.vpc.private_subnets
}

output "public_subnets" {
  value = module.vpc.private_subnets
}

output "nat_ids" {
  value = module.vpc.nat_ids
}

output "nat_public_ips" {
  value = module.vpc.nat_public_ips
}

output "all_zones" {
  value = module.vpc.zones
}

output "ssm_params" {
  value = module.env_vars.ssm_params
}
output "environment" {
  value = module.env_vars.environment
}
