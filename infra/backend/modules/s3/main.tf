resource "aws_s3_bucket" "bucket" {
  bucket = var.bucket_name
  force_destroy = true
}
resource "aws_s3_bucket_cors_configuration" "config_cors" {
  bucket = aws_s3_bucket.bucket.bucket
  cors_rule {
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
  }
}
resource "aws_s3_bucket_notification" "bucket_notification" {
  bucket = var.bucket_name
  eventbridge = true
}