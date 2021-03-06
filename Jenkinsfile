def label = "worker-${UUID.randomUUID().toString()}"

podTemplate(label: label, containers: [
  containerTemplate(name: 'maven', image: 'maven:3.6-jdk-8-alpine', command: 'cat', ttyEnabled: true),
  containerTemplate(name: 'node', image: 'node:9.11.1', command: 'cat', ttyEnabled: true),
  containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true),
  containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:v1.8.8', command: 'cat', ttyEnabled: true),
  containerTemplate(name: 'helm', image: 'lachlanevenson/k8s-helm:latest', command: 'cat', ttyEnabled: true)
],
volumes: [
  hostPathVolume(mountPath: '/home/gradle/.gradle', hostPath: '/tmp/jenkins/.gradle'),
  hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock')
]) {
  node(label) {
    def myRepo = checkout scm
    def gitCommit = myRepo.GIT_COMMIT
    def gitBranch = myRepo.GIT_BRANCH
    def shortGitCommit = "${gitCommit[0..10]}"
    def previousGitCommit = sh(script: "git rev-parse ${gitCommit}~", returnStdout: true)
 
    stage('Test') {
      try {
        container('maven') {
          sh """
            pwd
            echo "GIT_BRANCH=${gitBranch}" >> /etc/environment
            echo "GIT_COMMIT=${gitCommit}" >> /etc/environment
            """
        }
      }
      catch (exc) {
        println "Failed to test - ${currentBuild.fullDisplayName}"
        throw(exc)
      }
    }

    stage('Build Backend') {
      container('maven') {
        dir("back") {
            sh "mvn clean package -DskipTests=true"
        }
      }
    }
    stage('Create Docker images') {
      container('docker') {
        withCredentials([[$class: 'UsernamePasswordMultiBinding',
          credentialsId: 'dockerhub',
          usernameVariable: 'DOCKER_HUB_USER',
          passwordVariable: 'DOCKER_HUB_PASSWORD']]) {
          dir ("front-node") {
            sh """
                docker login -u ${DOCKER_HUB_USER} -p ${DOCKER_HUB_PASSWORD}
                docker build -t suportegm/frontend:latest .
                docker push suportegm/frontend:latest
                """
          }
          dir ("back") {
            sh """
                docker login -u ${DOCKER_HUB_USER} -p ${DOCKER_HUB_PASSWORD}
                docker build -t suportegm/backend:latest .
                docker push suportegm/backend:latest
                """
          }
        }
      }
    }
    stage('Run kubectl') {
      container('kubectl') {
        sh "kubectl get pods"
      }
    }
    stage('Run helm') {
      container('helm') {
        sh "helm list"
      }
    }

    stage('Install Backend') {
        container('kubectl') {
            dir('back') {
                sh 'kubectl apply -f kubernetes/deployment.yaml || true'
                sh 'kubectl apply -f kubernetes/service.yaml || true'
            }
        }
    }

    stage('Install Frontend') {
        container('kubectl') {
            dir('front-node') {
                sh 'kubectl apply -f kubernetes/deployment.yaml || true'
                sh 'kubectl apply -f kubernetes/service.yaml || true'
            }
        }
    }

    stage('update app') {
      container('kubectl') {
        sh 'kubectl get pods -n default --no-headers | cut -d ' ' -f1 | xargs kubectl delete pod -n default'
      }
    }

  }
}