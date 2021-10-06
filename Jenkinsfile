pipeline {
    agent any
    tools {nodejs "nodejs"}
    environment {
        serviceName = 'admin-portal'
        awsRegion = 'us-east-2'
        commitIDShort = sh(returnStdout: true, script: "git rev-parse --short HEAD")
    }
    stages {
        stage('Install Dependencies and Test') {
            steps {
                sh 'npm install'
                sh 'echo "Testing..."' 
                sh 'npm run test:headless'
                
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonarScanner') {
                    sh 'npm run sonar'
                }
            }
        }
        stage('Quality Gate') {
            steps {
                sh 'echo "Waiting for Quality Gate..."'
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        stage('deploy to s3') {
            steps {
              sh "echo 'deploying...'"
              sh "aws s3 sync build/ s3://admin.eastcodersbank.com"

            }
        }

    }

    post {
        success {
            sh 'echo "Finished."'
        }
    }
    

}