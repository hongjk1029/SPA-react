# Save secrets/password
resource "aws_ssm_parameter" "db_password" {
  name        = "POSTGRES_PASSWORD"
  description = "Postgres password"
  type        = "SecureString"
  value       = var.db_password
}

# Save environment vars which doesn't need to be hidden

resource "aws_ssm_parameter" "db_user_name" {
  name        = "POSTGRES_USER"
  description = "Postgres Username"
  type        = "String"
  value       = var.db_user_name
}

resource "aws_ssm_parameter" "db_name" {
  name        = "POSTGRES_DB"
  description = "Postgres DB Name"
  type        = "String"
  value       = var.db_name
}

resource "aws_ssm_parameter" "db_host" {
  name        = "DB_HOST"
  description = "Postgres DB Host"
  type        = "String"
  value       = var.db_host
}

resource "aws_ssm_parameter" "db_port" {
  name        = "DB_PORT"
  description = "Postgres DB Port"
  type        = "String"
  value       = var.db_port
}





resource "aws_ssm_parameter" "static_s3_bucket" {
  name        = "STATIC_S3_BUCKET"
  description = "Django Static Bucket Name"
  type        = "String"
  value       = var.static_s3_bucket
}

resource "aws_ssm_parameter" "static_cloudfront_url" {
  name        = "STATIC_CLOUDFRONT_URL"
  description = "Django Static Cloudfront URL"
  type        = "String"
  value       = var.static_cloudfront_url
}


locals {
  ssm_params = concat(
    # [for param in var.set_manually : {
    #   name      = param
    #   valueFrom = "${param}"
    # }],
    [
      {
        name      = aws_ssm_parameter.db_password.name
        valueFrom = aws_ssm_parameter.db_password.name
      },
      {
        name      = aws_ssm_parameter.db_user_name.name
        valueFrom = aws_ssm_parameter.db_user_name.name
      },
      {
        name      = aws_ssm_parameter.db_name.name
        valueFrom = aws_ssm_parameter.db_name.name
      },
      {
        name      = aws_ssm_parameter.db_host.name
        valueFrom = aws_ssm_parameter.db_host.name
      },
      {
        name      = aws_ssm_parameter.db_port.name
        valueFrom = aws_ssm_parameter.db_port.name
      },
      {
        name      = aws_ssm_parameter.static_s3_bucket.name
        valueFrom = aws_ssm_parameter.static_s3_bucket.name
      },
      {
        name      = aws_ssm_parameter.static_cloudfront_url.name
        valueFrom = aws_ssm_parameter.static_cloudfront_url.name
      },
  ])
  environment = [
    { "name" : "ENV", "value" : var.env },
    { "name" : "DEBUG", "value" : var.debug },
    { "name" : "USE_S3", "value" : var.use_s3 },
  ]
}
