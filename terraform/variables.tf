variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance size"
  type        = string
  default     = "t3.medium"
}

variable "key_name" {
  description = "Name of the existing AWS Key Pair for SSH access"
  type        = string
  default     = "devops-key"
}

variable "allowed_ip" {
  description = "Public IP address allowed for SSH and Grafana administration (CIDR format)"
  type        = string
  default     = "0.0.0.0/0"
}
