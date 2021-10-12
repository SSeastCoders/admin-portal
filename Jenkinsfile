pipeline {
    agent any
    tools {nodejs "nodejs"}
    environment {
        PORTAL_NAME = 'admin'
        REGION = 'us-east-2'
        DOMAIN = 'eastcodersbank.com'
        S3_NAME = 'dev-admin-portal-bucket-10052021'
        USER_ENDPOINT= 'http://DevApplicationLoadBalancer-270186758.us-east-2.elb.amazonaws.com:8222'
        ACCOUNT_ENDPOINT='http://DevApplicationLoadBalancer-270186758.us-east-2.elb.amazonaws.com:8223/api/v1/accounts'
        TRANSACTION_ENDPOINT='http://DevApplicationLoadBalancer-270186758.us-east-2.elb.amazonaws.com:8224/api/v1/transaction'
          
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
                    --stack-name ${PORTAL_NAME}-portal-stack \
                    --template-file admin-portal-stack.yml \
                    --parameter-overrides \
                        Domain=${DOMAIN} \
                    --capabilities CAPABILITY_NAMED_IAM \
                    --no-fail-on-empty-changeset \
                    --region ${REGION}
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
              sh "aws s3 sync dist/ s3://${S3_NAME}"

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

