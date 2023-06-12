resource "aws_iam_role" "MonitoringIAMRole" {
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "monitoring.rds.amazonaws.com"
        }
      }
    ]
    }
  )
  managed_policy_arns = ["arn:aws:iam::aws:policy/service-role/AmazonRDSEnhancedMonitoringRole"]
}

resource "aws_db_subnet_group" "rds_subnet_id" {
  subnet_ids = var.subnetIds
  name       = "${var.project}-${var.env}-rdssubnetgroup"
}

resource "aws_db_parameter_group" "custom_parameter_group_psql14" {
  name   = "custom-parameter-group-psql-14"
  family = "postgres14"

  parameter {
    apply_method = "pending-reboot"
    name         = "rds.logical_replication"
    value        = "1"
  }

  parameter {
    apply_method = "pending-reboot"
    name         = "shared_preload_libraries"
    value        = "pg_stat_statements,pglogical"
  }

  parameter {
    apply_method = "pending-reboot"
    name         = "max_wal_senders"
    value        = "30"
  }
}

resource "aws_db_instance" "rds_cluster" {
  allocated_storage            = var.allocated_storage
  max_allocated_storage        = var.max_allocated_storage
  engine                       = "postgres"
  engine_version               = "14.3"
  instance_class               = var.instance_class
  identifier                   = "${var.project}-${var.env}-postgresql"
  username                     = var.username
  password                     = var.password
  skip_final_snapshot          = true
  multi_az                     = var.multi_az
  db_subnet_group_name         = aws_db_subnet_group.rds_subnet_id.name
  db_name                      = var.db_name
  vpc_security_group_ids       = var.vpc_security_group_ids
  backup_retention_period      = 7
  monitoring_role_arn          = aws_iam_role.MonitoringIAMRole.arn
  monitoring_interval          = 60
  apply_immediately            = true
  performance_insights_enabled = var.performance_insights_enabled
  parameter_group_name         = aws_db_parameter_group.custom_parameter_group_psql14.name
}

# TODO: Need a Bastion Server