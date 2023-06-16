resource "aws_iam_role" "task_role" {
  name = "${var.project}-${var.env}-${var.repo}-taskrole"
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
  #  aws_service_name = "ecs-tasks.amazonaws.com"
  #  assume_role_policy = ""
}
resource "aws_cloudwatch_log_group" "ecs_log_group" {
  name              = "${var.project}-${var.env}-${var.repo}-ecs-log-group"
  retention_in_days = 30
}

resource "aws_ecs_task_definition" "task_definition" {
  container_definitions = jsonencode([
    {

      cpu       = var.cpu
      memory    = var.memory
      image     = var.ecr_name
      essential = true
      name      = var.repo
      command   = var.command
      logConfiguration = {
        "logDriver" = "awslogs"
        "options" = {
          "awslogs-group"         = "${aws_cloudwatch_log_group.ecs_log_group.name}"
          "awslogs-region"        = "${var.region}"
          "awslogs-stream-prefix" = "ecs"
        }
      },
      secrets     = var.secrets
      environment = var.environment
  }])
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  memory                   = var.memory
  cpu                      = var.cpu
  execution_role_arn       = var.execution_role_arn
  task_role_arn            = aws_iam_role.task_role.arn
  family                   = "${var.project}-${var.env}-${var.repo}"
}


resource "aws_ecs_service" "ecs_service" {
  name                   = "${var.repo}-service"
  cluster                = var.cluster_arn
  force_new_deployment   = true
  enable_execute_command = true
  task_definition        = aws_ecs_task_definition.task_definition.arn
  launch_type            = "FARGATE"
  desired_count          = 1
  platform_version       = "LATEST"
  network_configuration {
    subnets          = var.subnets_id
    security_groups  = var.security_groups_id
    assign_public_ip = false
  }
}
resource "aws_appautoscaling_target" "autoscaling_target" {
  max_capacity       = 5
  min_capacity       = 1
  resource_id        = "service/${var.cluster_name}/${aws_ecs_service.ecs_service.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}
resource "aws_appautoscaling_policy" "scaling_memory" {
  name               = "${var.repo}-scale-by-memory"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.autoscaling_target.id
  scalable_dimension = aws_appautoscaling_target.autoscaling_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.autoscaling_target.service_namespace
  target_tracking_scaling_policy_configuration {
    target_value       = 80
    scale_in_cooldown  = 30
    scale_out_cooldown = 30
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageMemoryUtilization"
    }
  }
}
resource "aws_appautoscaling_policy" "scaling_cpu_step" {
  name               = "${var.project}-${var.env}-${var.repo}-scale-by-cpu"
  policy_type        = "StepScaling"
  resource_id        = aws_appautoscaling_target.autoscaling_target.id
  scalable_dimension = aws_appautoscaling_target.autoscaling_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.autoscaling_target.service_namespace
  step_scaling_policy_configuration {
    adjustment_type         = "ChangeInCapacity"
    cooldown                = 60
    metric_aggregation_type = "Maximum"
    step_adjustment {
      metric_interval_lower_bound = 0
      scaling_adjustment          = 2
    }
  }
}
resource "aws_cloudwatch_metric_alarm" "ScalingOutAlarm_CPUUtilization" {
  alarm_name          = "${var.project}-${var.env}-${var.repo}-ScalingOutAlarm-CPUUtilization"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 3
  metric_name         = "CPUUtilization"
  namespace           = "AWS/ECS"
  period              = 60
  statistic           = "Maximum"
  threshold           = 60
  dimensions = {
    ServiceName = aws_ecs_service.ecs_service.name
    ClusterName = var.cluster_name
  }
  alarm_actions = [aws_appautoscaling_policy.scaling_cpu_step.arn]
}
