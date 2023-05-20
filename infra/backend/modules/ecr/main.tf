resource "aws_ecr_repository" "ecr_repo" {
  name = "${var.project}-${var.env}-${var.repo}-ecr"
}

resource "aws_ecr_lifecycle_policy" "cleanup_policy" {
  repository = aws_ecr_repository.ecr_repo.name

  policy = <<EOF
{
    "rules": [
        {
            "rulePriority": 1,
            "description": "Keep last 30 images",
            "selection": {
                "tagStatus": "any",
                "countType": "imageCountMoreThan",
                "countNumber": 30
            },
            "action": {
                "type": "expire"
            }
        }
    ]
}
EOF
}
