module "infra_system" {
  source         = "../modules/system"
  env            = "develop"
  db_instance    = "db.t4g.micro"
  db_storage     = "20"
  region         = "ap-southeast-1"
  server_cpu     = 512
  server_ram     = 1024
  rds_multi_az   = "false"
  redis_instance = "cache.t4g.micro"
  redis_clusters = 1
}
