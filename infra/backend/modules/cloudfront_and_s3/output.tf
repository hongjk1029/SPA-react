output "cloudfront_endpoint" {
    value = aws_cloudfront_distribution.cloudfront.domain_name
}
output "s3_bucket" {
    value = aws_s3_bucket.bucket.bucket
}