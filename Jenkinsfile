pipeline {
    agent any

    environment {
        AWS_REGION     = 'us-east-1'
        AWS_ACCOUNT_ID = '542551366580'
        ECR_REGISTRY   = '542551366580.dkr.ecr.us-east-1.amazonaws.com'
        EC2_IP         = '3.88.185.81'
        IMAGE_TAG      = "${BUILD_NUMBER}"
        SERVICES       = 'user-service product-service order-service'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Validation') {
            steps {
                echo "Validating project workspace..."
                sh 'node -v || true'
            }
        }

        stage('Build & Tag Docker Images') {
            steps {
                sh """
                    for svc in ${SERVICES}; do
                        echo "Building \$svc..."
                        docker build -t ${ECR_REGISTRY}/\$svc:${IMAGE_TAG} -t ${ECR_REGISTRY}/\$svc:latest ./services/\$svc
                    done
                """
            }
        }

        stage('Authenticate & Push to ECR') {
            steps {
                sh """
                    aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}
                    for svc in ${SERVICES}; do
                        echo "Pushing \$svc..."
                        docker push ${ECR_REGISTRY}/\$svc:${IMAGE_TAG}
                        docker push ${ECR_REGISTRY}/\$svc:latest
                    done
                """
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} "mkdir -p ~/app/nginx"
                        scp -o StrictHostKeyChecking=no docker/docker-compose.prod.yml ubuntu@${EC2_IP}:~/app/docker-compose.yml
                        scp -o StrictHostKeyChecking=no docker/nginx/nginx.conf ubuntu@${EC2_IP}:~/app/nginx/nginx.conf
                        
                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} "
                            cd ~/app
                            aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}
                            export IMAGE_TAG=${IMAGE_TAG}
                            docker compose pull
                            docker compose up -d --remove-orphans
                        "
                    """
                }
            }
        }

        stage('Health Check') {
            steps {
                sh """
                    sleep 10
                    curl -f -s http://${EC2_IP}/health || exit 1
                """
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        failure {
            echo "Pipeline run failed. Check container logs."
        }
    }
}
