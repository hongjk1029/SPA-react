output "vpc_id" {
  description = "ID of project VPC"
  value       = module.infra_system.vpc_id
}

output "private_subnets" {
  value = module.infra_system.private_subnets
}

output "public_subnets" {
  value = module.infra_system.public_subnets
}

output "nat_ids" {
  value = module.infra_system.nat_ids
}

output "nat_public_ips" {
  value = module.infra_system.nat_public_ips
}

output "all_zones" {
  value = module.infra_system.all_zones
}


output "environment" {
  value = module.infra_system.environment
}
