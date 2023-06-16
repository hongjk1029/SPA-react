terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region  = "ap-southeast-1"
  profile = "spa-develop"
}

terraform {
  backend "s3" {
    bucket  = "linken-terraform-develop"
    region  = "ap-southeast-1"
    key     = "spa/tf.state"
    profile = "spa-develop"
  }
}
