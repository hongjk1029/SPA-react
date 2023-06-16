variable "project" {}
variable "env" {}
variable "db_name" {}
variable "db_user_name" {}
variable "db_password" {}
variable "db_port" {
  default = "5432"
}
variable "db_host" {}
variable "static_s3_bucket" {}
variable "static_cloudfront_url" {}
# variable "set_manually" {
#   description = "Values that need to be set manually in AWS SSM Parameters"
#   type        = list(string)
#   default = [
#     "ADMIN_ENDPOINT",
#     "API_VERSION",
#     "ACCESS_KEY_AWS_FOR_ANYMAIL_SES",
#     "SECRET_KEY_AWS_FOR_ANYMAIL_SES",
#     "DEMO_EMAIL",
#     "FITBIT_CLIENT_ID",
#     "FITBIT_CLIENT_SECRET",
#     "GOOGLE_AUTH_PROVIDER_X509_CERT_URL",
#     "GOOGLE_AUTH_URI",
#     "GOOGLE_CLIENT_EMAIL",
#     "GOOGLE_CLIENT_ID",
#     "GOOGLE_CLIENT_X509_CERT_URL",
#     "GOOGLE_PRIVATE_KEY_ID",
#     "GOOGLE_PRIVATE_KEY",
#     "GOOGLE_PROJECT_ID",
#     "GOOGLE_TOKEN_URI",
#     "HOST",
#     "MAILGUN_API_KEY",
#     "MAILGUN_WEBHOOK_SECRET",
#     "OURA_CLIENT_ID",
#     "OURA_SECRET_TOKEN",
#     "SECRET_KEY",
#     "SENTRY_DSN",
#     "SLEEP_SCORE_URL",
#     "BRANCH_IO_URL",
#     "BRANCH_IO_KEY",
#     "UPLOAD_DURATION_SECS",
#     "ONESIGNAL_KEY",
#     "ONESIGNAL_APP_ID"
#   ]
# }

variable "use_s3" {
  default = "1"
}
variable "debug" {
  default = "0"
}
