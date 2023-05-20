# Terraform Infrastructure

- Terraform [documentation](https://developer.hashicorp.com/terraform/tutorials/aws-get-started)
- [Other resources](https://spagg.atlassian.net/wiki/spaces/PAC/pages/45973505/Resources+to+learn+infra)
## How to confluence docs
- [Move AWS](https://spagg.atlassian.net/wiki/spaces/PAC/pages/36962305/Moving+AWS+environment)
- [How to connect DB](https://spagg.atlassian.net/wiki/spaces/PAC/pages/34570286/How+to+connect+to+DB)
- [How to add environment variable](https://spagg.atlassian.net/wiki/spaces/PAC/pages/51281921/How+to+add+environment+variable+to+API)


## Projects:
- `infra`
  - Provisions all the resources for spa Backend API infra.
  - Deployed to:
    - Develop
    - Staging
    - Production
  - VPC CIDR - 10.20.0.0/16
- `gitlab-runner`
  - Provisions gitlab runner for running CI/CD.
  - Deployed to
    - Develop: Primary, and should run most of the CI/CD tasks
    - Staging: For backup in case if `develop` goes down for some rason
  - VPC CIDR - 10.30.0.0/16

## Notes:
- Each deployment saves terraform state in their respective AWS account
- Always deploy to the AWS account from corresponding branch
  - Deploy to "develop AWS account" from develop branch or a feature branch created from develop
  - So, when changing infra create a feature branch from develop
  - Make MR
  - Once okay, deploy to "AWS develop account"
  - Merge MR
  - Then, create release MR for develop->staging, and deploy to staging
  - Lastly, create release MR for develop->staging, and deploy to staging
- Effort should be made on keeping things modular
- The main module for both `infra` and `runner` is `system`
- Each main file in env folders(e.g. develop/main.tf) just calls the `system` module and passes the environment specific values
- `system` module in turn calls other modules to initialize over-all resources

## Setup:
In order to run commands you need to first install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html). Then, add the AWS account credentials to the corresponding following profiles
```bash
# Add credentials for environments
$ aws configure --profile spa-develop
# Enter the access-key-id and secret-access-key for develop AWS account
$ aws configure --profile spa-staging
# Enter the access-key-id and secret-access-key for staging AWS account
$ aws configure --profile spa-production
# Enter the access-key-id and secret-access-key for production AWS account
```

## Deploying API Infra

For deploying infrastructure, we are using terraform to deploy to separate environments in AWS. To deploy, we need to go to the folder `infra` in this repo's **spa-infra** folder and run these command:

```bash
# Example is for deploying to develop. (Same steps for staging & production)

# Switch to develop branch
$ git checkout develop
$ git pull

$ cd infra/

# Go to the environment folder
$ cd develop/

$ terraform init

# to see the changes that will happen
$ terraform plan

# to apply the changes
$ terraform apply
```

For rollback deployment when fail, we must do it manually in the AWS console. [link](https://engineering.resolvergroup.com/2021/10/rolling-back-aws-elastic-container-service-ecs-deployments/)


## Deploying gitlab-runner
- Gitlab runner is currently just deployed in develop and staging, and it is tied to gitlab using `registration_token`.
- It keeps one EC2 server running, but on extra load will spin other EC2 servers, and destroy them once tasks are finished
- You can see the runner and the env of gitlab in Repo => Setting => CI/CD
- Gitlab-runner
  - [Github](https://github.com/npalm/terraform-aws-gitlab-runner)
  - [Docs](https://registry.terraform.io/modules/npalm/gitlab-runner/aws/latest)

```bash
$ cd gitlab-runner/

# Go to the environment folder
$ cd develop/

$ terraform init

# to see the changes that will happen
$ terraform plan

# to apply the changes
$ terraform apply
```

## Infra Drawing
If there are any infra-changes, it should be updated in [confluence](https://spagg.atlassian.net/wiki/spaces/PAC/pages/32375028/AWS+Infrastructure+base)
- Sign-up or login https://app.diagrams.net/, and connect with a cloud-drive
- Import spa-prod.draw.xml, and make changes
- Export png and update confluence doc
- Export xml and update the spa-prod.draw.xml file in this repo
