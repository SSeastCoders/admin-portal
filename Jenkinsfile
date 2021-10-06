pipeline {
    agent any
    tools {nodejs "nodejs"}
    environment {
        portalName = 'admin'
        awsRegion = 'us-east-2'
        domain = 'eastcodersbank.com'

    }
    stages {
        stage('Install Dependencies and Test') {
            steps {
                sh 'npm install'
                sh 'echo "Testing..."' 
                sh 'npm run test:headless'
                
            }
        }
        // stage('SonarQube Analysis') {
        //     steps {
        //         withSonarQubeEnv('sonarScanner') {
        //             sh 'npm run sonar'
        //         }
        //     }
        // }
        // stage('Quality Gate') {
        //     steps {
        //         sh 'echo "Waiting for Quality Gate..."'
        //         timeout(time: 10, unit: 'MINUTES') {
        //             waitForQualityGate abortPipeline: true
        //         }
        //     }
        // }
        stage("Setup Portal Stack") {
            steps {
                sh '''
                    aws cloudformation deploy \
                    --stack-name ${portalName}-portal-stack \
                    --template-file admin-portal-stack.yml \
                    --parameter-overrides \
                        Domain=${domain} \
                    --capabilities CAPABILITY_NAMED_IAM \
                    --no-fail-on-empty-changeset \
                    --region ${awsRegion}
                '''
            }
        }



        stage("Build") {
            steps {
                sh "npm run build --prod"
            }
        }
        stage('Deploy to s3') {
            steps {
              sh "echo 'deploying...'"
              sh "aws s3 sync dist/ s3://admin.eastcodersbank.com"

            }
        }

    }

    post {
        success {
            sh 'echo "Finished."'
        }
        always {
            sh "rm -rf node_modules"
        }
    }
    

}

