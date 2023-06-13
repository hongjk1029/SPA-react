module "infra_system" {
  source         = "../modules/system"
  env            = "develop"
  db_instance    = "db.t4g.micro"
  db_storage     = "20"
  region         = "ap-southeast-1"
  server_cpu     = 256
  server_ram     = 512
  rds_multi_az   = "false"
}
