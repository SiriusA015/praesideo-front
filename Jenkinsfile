pipeline {
    agent { label 'docker' }
    triggers {
      pollSCM 'H/15 * * * *'
    }

    environment {
        DEV_MAIL = "vadim.koshman@mainsoft.org"
        DOCKER_BUILD_IMAGE = 'node:12.22'
        GIT_COMMIT_SHORT = "${env.GIT_COMMIT.take(7)}"
        REGISTRY = "952651576143.dkr.ecr.eu-central-1.amazonaws.com"
        REGISTRYCREDENTIAL = 'ecr:eu-central-1:praesideo-ecr-user'
        APP = 'praesideo-frontend'
        SSH_PRIVATE_KEY = "jenkins_rsa"
        NPM_REGISTRY = 'npm.fontawesome.com'
        DEPENDENCYTRACK = "Dependency-Track"
        CI = false
        }

    stages {
        stage('Set ENV for branch dev') {
          when { branch 'dev' }
          steps {
            script {
              PORT = "22"
              IP_ADDRESS = "ec2-3-123-234-136.eu-central-1.compute.amazonaws.com"
              SSH_USER = "root"
              REACT_APP_API_URL="https://apps-dev-be.praesideo.earth/api/"
              REACT_APP_TECH_SUPPORT_EMAIL="info@praesideo.earth"
            }
            echo "PORT = $PORT"
            echo "IP_ADDRESS = $IP_ADDRESS"
            echo "Branch = $BRANCH_NAME"
          }
        }
        stage('Set ENV for branch stage') {
          when { branch 'stage' }
          steps {
            script {
              PORT = "22"
              IP_ADDRESS = "ec2-3-65-190-58.eu-central-1.compute.amazonaws.com"
              SSH_USER = "root"
              REACT_APP_API_URL="https://apps-uat-be.praesideo.earth/api/"
              REACT_APP_TECH_SUPPORT_EMAIL="info@praesideo.earth"
            }
            echo "PORT = $PORT"
            echo "IP_ADDRESS = $IP_ADDRESS"
            echo "Branch = $BRANCH_NAME"
          }
        }
        stage('Set ENV for branch master') {
          when { branch 'master' }
          steps {
            script {
              PORT = "22"
              IP_ADDRESS = "ec2-18-193-16-169.eu-central-1.compute.amazonaws.com"
              SSH_USER = "root"
              REACT_APP_API_URL="https://apps.praesideo.earth/api/"
              REACT_APP_TECH_SUPPORT_EMAIL="info@praesideo.earth"
            }
            echo "PORT = $PORT"
            echo "IP_ADDRESS = $IP_ADDRESS"
            echo "Branch = $BRANCH_NAME"
          }
        }
        stage('Node Build') {
            agent {
                docker {
                    image "${env.DOCKER_BUILD_IMAGE}"
                    reuseNode true
                }
            }
            environment {
                npm_config_cache = 'npm-cache'
                npm_config_userconfig = '.npmrc'
                REACT_APP_API_URL = "$REACT_APP_API_URL"
                REACT_APP_TECH_SUPPORT_EMAIL = "$REACT_APP_TECH_SUPPORT_EMAIL"
            }
            steps {
                withCredentials([string(credentialsId: "$NPM_REGISTRY", variable: 'SECRET')]) {
                  sh 'ls -la'
                  sh 'env'
                  sh 'npm config set "@fortawesome:registry" https://npm.fontawesome.com/'
                  sh('npm config set "//npm.fontawesome.com/:_authToken" $SECRET')
                  sh 'yarn install'
                  sh 'yarn build'
                  // sh 'npm install --prefix ./ -g @cyclonedx/bom'
                  // sh 'bin/cyclonedx-bom -o bom.json'
                }
            }
        }
        // stage('dependencyTrackPublisher') {
        //     steps {
        //         withCredentials([string(credentialsId: "$DEPENDENCYTRACK", variable: 'API_KEY')]) {
        //             dependencyTrackPublisher artifact: 'bom.json', projectName: "$APP", projectVersion: "$APP", synchronous: true, dependencyTrackApiKey: API_KEY
        //         }
        //     }
        // }
        stage('Building our image') {
            steps {
              script {
                sh 'cat Dockerfile'
                DOCKERIMAGE = docker.build(registry + "/$APP:$GIT_COMMIT_SHORT",
                              "--build-arg GIT_COMMIT=$GIT_COMMIT"
                              + " ."
                          )
                }
            }
        }
        stage('Deploy our image') {
            steps {
              script {
                docker.withRegistry( "https://" + REGISTRY + "/$APP:$GIT_COMMIT_SHORT", REGISTRYCREDENTIAL ) {
                    DOCKERIMAGE.push()
                    }
                }
            }
        }
        stage('Cleaning up') {
            steps {
                sh "docker rmi $registry/$APP:$GIT_COMMIT_SHORT"
            }
        }
        stage('deploy'){
            environment {
              PORT = "$PORT"
              IP_ADDRESS = "$IP_ADDRESS"
              SSH_USER = "$SSH_USER"
            }
            steps{
              script {
                sh "envsubst < docker-compose.yml > $BRANCH_NAME-docker-compose.yml"
                sshagent (credentials: ["$SSH_PRIVATE_KEY"]) {
                  docker.withServer("ssh://$SSH_USER@$IP_ADDRESS") {
                     docker.withRegistry( "https://" + REGISTRY, REGISTRYCREDENTIAL ) {
                       sh "docker pull $REGISTRY/$APP:$GIT_COMMIT_SHORT"
                       sh "docker stack deploy --compose-file $BRANCH_NAME-docker-compose.yml --with-registry-auth $APP"
                       sh '''
                          sleep 20s
                          HOSTNAME=$(ssh -o StrictHostKeyChecking=no -T $SSH_USER@$IP_ADDRESS hostname)
                          for i in `seq 1 10`;
                          do
                            STATUS=$(ssh -o StrictHostKeyChecking=no -T $SSH_USER@$IP_ADDRESS curl -o /dev/null -s -w %{http_code} http://$HOSTNAME:8081/#/login)
                            if [ $STATUS -eq 200 ]; then
                              docker service ls --filter name="${APP}_${APP}"
                              break
                            fi
                            sleep 10s
                            false
                          done || exit 1
                      '''
                    }
                  }
                }
              }
            }
            post {
                success {
                  echo "Deploy $APP success"
                }
                failure {
                  script {
                    echo "Service update failed"
                    sshagent (credentials: ["$SSH_PRIVATE_KEY"]) {
                     docker.withServer("ssh://$SSH_USER@$IP_ADDRESS") {
                       sh "docker service update --rollback ${APP}_${APP}"
                     }
                   }
                 }
               }
            }
         }
    }
    post {
        always {
            echo "Clean up workspace"
            deleteDir()
        }
    }
}
