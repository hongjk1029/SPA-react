resource "aws_elasticache_replication_group" "redis" {
  engine                     = "redis"
  node_type                  = var.redis_instance
  num_cache_clusters         = var.num_cache_clusters
  port                       = var.redis_port
  apply_immediately          = true
  subnet_group_name          = aws_elasticache_subnet_group.elasticache_subnet_group.name
  security_group_ids         = var.security_group_ids
  description                = "Redis Cache"
  replication_group_id       = "${var.project}-${var.env}-redis-group"
  automatic_failover_enabled = var.num_cache_clusters > 1
  multi_az_enabled           = var.num_cache_clusters > 1
}

resource "aws_elasticache_subnet_group" "elasticache_subnet_group" {
  name       = "${var.project}-${var.env}-subnet-group"
  subnet_ids = var.subnet_ids
}
