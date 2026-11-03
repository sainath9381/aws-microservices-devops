output "ec2_public_ip" {
  description = "Public IP of the deployed EC2 server"
  value       = aws_instance.app_server.public_ip
}

output "ecr_repository_urls" {
  description = "URLs of the created Amazon ECR repositories"
  value       = { for k, v in aws_ecr_repository.services : k => v.repository_url }
}
