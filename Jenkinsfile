pipeline {
  agent any

  environment {
    GITHUB_CREDS = credentials('github-credentials')
  }

  stages {
    stage('Check Commit Message') {
      steps {
        script {
          def commitMsg = sh(returnStdout: true, script: 'git log -1 --pretty=%B').trim()
          if (commitMsg.contains("@push")) {
            echo "Triggering GitHub push..."
          } else {
            error("Commit message does not contain '@push'. Aborting.")
          }
        }
      }
    }

    stage('Build') {
      steps {
        echo "Building the application..."
      }
    }

    stage('Test') {
      steps {
        echo "Running tests..."
      }
    }

    stage('Push to GitHub') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'github-credentials',
          usernameVariable: 'GITHUB_USER',
          passwordVariable: 'GITHUB_TOKEN'
        )]) {
          sh '''
            git remote set-url origin https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/Namgay282004/DSO-final-assignment.git
            git push origin HEAD:master
          '''
        }
      }
    }
  }
}
