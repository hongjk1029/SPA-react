##VPC
module "vpc" {
  source  = "../vpc"
  env     = var.env
  project = var.project
}

module "server_ecr_repo" {
  source  = "../ecr"
  env     = var.env
  project = var.project
  repo    = "server"
}

module "sleepscore_ecr_repo" {
  source  = "../ecr"
  env     = var.env
  project = var.project
  repo    = "sleepscore"
}

##Security Groups
resource "aws_security_group" "ecs_task_security_group_default" {
  name        = "${var.project}-${var.env}-ecs-default-sg"
  vpc_id      = module.vpc.vpc_id
  description = "SG default for ECS Tasks"
  egress {
    from_port   = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    to_port     = 0
  }
  ingress {
    from_port       = 8001
    protocol        = "TCP"
    to_port         = 8001
    security_groups = ["${aws_security_group.load_balance_secrurity_group.id}"]
  }

  tags = {
    Name = "ECS Server SG"
  }
}

resource "aws_security_group" "sleep_core_task_security_group" {
  name        = "${var.project}-${var.env}-sleep-core-sg"
  vpc_id      = module.vpc.vpc_id
  description = "SG  for sleepscore"
  egress {
    from_port   = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    to_port     = 0
  }
  ingress {
    from_port       = 5000
    protocol        = "TCP"
    to_port         = 5000
    security_groups = ["${aws_security_group.sleepscore_load_balance_secrurity_group.id}"]
  }

  tags = {
    Name = "ECS Sleepscore SG"
  }
}

resource "aws_security_group" "rds_secrurity_group" {
  name        = "${var.project}-${var.env}-rds-sg"
  description = "SG for RDS Postgres"
  vpc_id      = module.vpc.vpc_id
  ingress {
    from_port       = 5432
    protocol        = "TCP"
    to_port         = 5432
    security_groups = ["${aws_security_group.ecs_task_security_group_default.id}"]
  }
  egress {
    from_port   = 0
    protocol    = "-1"
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "PostgreSQL SG"
  }
}

resource "aws_security_group" "redis_security_group" {
  name        = "${var.project}-${var.env}-redis-sg"
  description = "SG for RDS"
  vpc_id      = module.vpc.vpc_id
  ingress {
    from_port       = 6379
    protocol        = "TCP"
    to_port         = 6379
    security_groups = ["${aws_security_group.ecs_task_security_group_default.id}"]
  }
  egress {
    from_port   = 0
    protocol    = "-1"
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Redis SG"
  }
}

resource "aws_security_group" "load_balance_secrurity_group" {
  name   = "${var.project}-${var.env}-alb-sg"
  vpc_id = module.vpc.vpc_id
  ingress {
    from_port   = 80
    protocol    = "TCP"
    to_port     = 80
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 443
    protocol    = "TCP"
    to_port     = 443
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    protocol    = "-1"
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Server Load Balancer SG"
  }
}

resource "aws_security_group" "sleepscore_load_balance_secrurity_group" {
  name   = "${var.project}-${var.env}-sleepscore-alb-sg"
  vpc_id = module.vpc.vpc_id
  # TODO check if all these rules are needed
  ingress {
    from_port       = 80
    protocol        = "TCP"
    to_port         = 80
    security_groups = [aws_security_group.ecs_task_security_group_default.id]
  }
  ingress {
    from_port       = 443
    protocol        = "TCP"
    to_port         = 443
    security_groups = [aws_security_group.ecs_task_security_group_default.id]
  }
  ingress {
    from_port   = 80
    protocol    = "TCP"
    to_port     = 80
    cidr_blocks = [for s in module.vpc.nat_public_ips : "${s}/32"]
  }
  ingress {
    from_port   = 443
    protocol    = "TCP"
    to_port     = 443
    cidr_blocks = [for s in module.vpc.nat_public_ips : "${s}/32"]
  }
  egress {
    from_port   = 0
    protocol    = "-1"
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Sleepscore Load Balancer SG"
  }
}

resource "random_password" "database_password" {
  length  = 16
  special = false
}

# Roles
resource "aws_iam_role" "execution_role" {
  name = "${var.project}-${var.env}-executionrole"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
  inline_policy {
    name = "${var.project}-${var.env}-executionrole-policy"
    policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
        {
          Action = [
            "ssm:GetParameters",
            "ecr:*",
            "cloudwatch:*",
            "logs:*",
            "secretsmanager:*",
            "s3:*"
          ]
          Effect   = "Allow"
          Resource = "*"
        },
      ]
    })
  }
}

# Set environment variables
module "env_vars" {
  source                = "../env_vars"
  project               = var.project
  env                   = var.env
  db_name               = var.db_name
  db_user_name          = var.db_user_name
  db_password           = random_password.database_password.result
  db_host               = module.Postgres.rds_endpoint
  redis_host            = module.Redis.redis
  redis_port            = var.redis_port
  static_s3_bucket      = module.static_file.s3_bucket
  static_cloudfront_url = module.static_file.cloudfront_endpoint
  data_stream_bucket    = module.streaming_bucket_v2.s3_bucket
}

##Postgres
module "Postgres" {
  source                       = "../rds"
  instance_class               = var.db_instance
  max_allocated_storage        = "1000"
  password                     = random_password.database_password.result
  project                      = var.project
  subnetIds                    = module.vpc.private_subnets
  username                     = var.db_user_name
  vpc_security_group_ids       = ["${aws_security_group.rds_secrurity_group.id}"]
  allocated_storage            = var.db_storage
  db_name                      = var.db_name
  env                          = var.env
  multi_az                     = var.rds_multi_az
  performance_insights_enabled = "true"
}

###Redis
module "Redis" {
  source             = "../redis"
  env                = var.env
  redis_instance     = var.redis_instance
  redis_port         = var.redis_port
  num_cache_clusters = var.redis_clusters
  project            = var.project
  security_group_ids = ["${aws_security_group.redis_security_group.id}"]
  subnet_ids         = module.vpc.private_subnets
}

# ##ECS-Cluster
resource "aws_ecs_cluster" "ecs_cluster" {
  name = "${var.project}-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

resource "aws_iam_role" "ecs_auto_scaling_role" {
  name = "${var.project}-${var.env}-ecs_auto_scaling_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
  managed_policy_arns = ["arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceAutoscaleRole"]
}

module "ALB" {
  source          = "../alb"
  env             = var.env
  project         = var.project
  prefix          = "web"
  subnets         = module.vpc.public_subnets
  security_groups = ["${aws_security_group.load_balance_secrurity_group.id}"]
}

module "sleepscore_ALB" {
  source          = "../alb"
  env             = var.env
  project         = var.project
  prefix          = "sleepscore"
  subnets         = module.vpc.public_subnets
  security_groups = ["${aws_security_group.sleepscore_load_balance_secrurity_group.id}"]
}

# ##ECS
# ##Server
module "server" {
  source             = "../ecs"
  env                = var.env
  project            = var.project
  repo               = "server"
  cluster_arn        = aws_ecs_cluster.ecs_cluster.arn
  cluster_name       = aws_ecs_cluster.ecs_cluster.name
  security_groups_id = ["${aws_security_group.ecs_task_security_group_default.id}"]
  subnets_id         = module.vpc.private_subnets
  execution_role_arn = aws_iam_role.execution_role.arn
  vpc_id             = module.vpc.vpc_id
  alb_arn            = module.ALB.alb.arn
  region             = var.region
  cpu                = var.server_cpu
  memory             = var.server_ram
  containerport      = 8001
  secrets            = module.env_vars.ssm_params
  environment        = module.env_vars.environment
  ecr_name           = module.server_ecr_repo.repository_url
  listener_arn       = module.ALB.listener.arn
  healthcheck        = "/health-check/"
  command            = ["gunicorn", "--config=gunicorn.py", "pacer.wsgi:application", "--capture-output"]
  entry_point        = ["/app/entrypoint.sh"]
}

module "sleepscore" {
  source             = "../ecs"
  env                = var.env
  project            = var.project
  repo               = "sleepscore"
  cluster_arn        = aws_ecs_cluster.ecs_cluster.arn
  cluster_name       = aws_ecs_cluster.ecs_cluster.name
  security_groups_id = ["${aws_security_group.sleep_core_task_security_group.id}"]
  subnets_id         = module.vpc.private_subnets
  execution_role_arn = aws_iam_role.execution_role.arn
  vpc_id             = module.vpc.vpc_id
  alb_arn            = module.sleepscore_ALB.alb.arn
  region             = var.region
  cpu                = var.sleepscore_cpu
  memory             = var.sleepscore_ram
  containerport      = 5000
  secrets            = []
  environment        = []
  ecr_name           = module.sleepscore_ecr_repo.repository_url
  listener_arn       = module.sleepscore_ALB.listener.arn
  healthcheck        = "/health-check"
  command            = ["flask", "run", "--host=0.0.0.0"]
  entry_point        = []
}

## Beat Server
module "beat" {
  source             = "../ecs_without_alb"
  env                = var.env
  project            = var.project
  repo               = "beat"
  cluster_arn        = aws_ecs_cluster.ecs_cluster.arn
  cluster_name       = aws_ecs_cluster.ecs_cluster.name
  security_groups_id = ["${aws_security_group.ecs_task_security_group_default.id}"]
  subnets_id         = module.vpc.private_subnets
  execution_role_arn = aws_iam_role.execution_role.arn
  vpc_id             = module.vpc.vpc_id
  region             = var.region
  cpu                = var.beat_cpu
  memory             = var.beat_ram
  secrets            = module.env_vars.ssm_params
  environment        = module.env_vars.environment
  ecr_name           = module.server_ecr_repo.repository_url
  command = [
    "celery", "-A", "pacer", "beat", "-l", "INFO", "--scheduler", "django_celery_beat.schedulers:DatabaseScheduler"
  ]
}

##celery
module "celery" {
  source             = "../ecs_without_alb"
  env                = var.env
  project            = var.project
  repo               = "celery"
  cluster_arn        = aws_ecs_cluster.ecs_cluster.arn
  cluster_name       = aws_ecs_cluster.ecs_cluster.name
  security_groups_id = ["${aws_security_group.ecs_task_security_group_default.id}"]
  subnets_id         = module.vpc.private_subnets
  execution_role_arn = aws_iam_role.execution_role.arn
  vpc_id             = module.vpc.vpc_id
  region             = var.region
  cpu                = var.celery_cpu
  memory             = var.celery_ram
  secrets            = module.env_vars.ssm_params
  environment        = module.env_vars.environment
  ecr_name           = module.server_ecr_repo.repository_url
  command            = ["celery", "-A", "pacer", "worker", "-l", "info", "--concurrency=1", "--loglevel=INFO"]
}

module "static_file" {
  source      = "../cloudfront_and_s3"
  bucket_name = "${var.project}-${var.env}-django-static"
}

# Deprecated S3 bucket, to be removed
module "streaming_bucket" {
  source      = "../s3"
  bucket_name = "${var.project}-${var.env}-streaming-data-deprecated"
}

module "streaming_bucket_v1" {
  source      = "../s3"
  bucket_name = "${var.project}-${var.env}-streaming-data-v1"
}

module "streaming_bucket_v2" {
  source      = "../s3"
  bucket_name = "${var.project}-${var.env}-streaming-data-v2"
}
