pipeline {
  agent any

  stages {
    stage('Install Node Modules') {
      steps { sh 'npm install' }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Unit Tests') {
      steps {
        sh 'npm run test'
      }
    }

    stage('E2E Tests') {
      steps {
        sh 'npm run e2e'
      }
    }
  }
}
