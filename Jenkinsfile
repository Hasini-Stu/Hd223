pipeline {
    agent any
    
    environment {
        // Docker and registry configuration
        DOCKER_REGISTRY = 'your-registry.com'
        DOCKER_IMAGE_NAME = 'parkcharge-smart-rewards'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        DOCKER_LATEST_TAG = 'latest'
        
        // Application configuration
        APP_NAME = 'parkcharge-smart-rewards'
        NODE_VERSION = '18'
        
        // Test and quality gates
        COVERAGE_THRESHOLD = '80'
        SONAR_PROJECT_KEY = 'parkcharge-smart-rewards'
        SONAR_ORGANIZATION = 'your-org'
        
        // Deployment environments
        TEST_ENV_URL = 'https://test.parkcharge.com'
        PROD_ENV_URL = 'https://parkcharge.com'
        
        // Notification settings
        SLACK_CHANNEL = '#devops-alerts'
        EMAIL_RECIPIENTS = 'devops@parkcharge.com'
    }
    
    options {
        // Keep only last 10 builds
        buildDiscarder(logRotator(numToKeepStr: '10'))
        
        // Timeout after 30 minutes
        timeout(time: 30, unit: 'MINUTES')
        
        // Skip default checkout
        skipDefaultCheckout()
        
        // Timestamps in console output
        timestamps()
        
        // AnsiColor for better console output
        ansiColor('xterm')
    }
    
    stages {
        stage('Checkout') {
            steps {
                script {
                    echo "🔄 Checking out code from repository..."
                    checkout scm
                    
                    // Get git information
                    env.GIT_COMMIT_SHORT = sh(
                        script: "git rev-parse --short HEAD",
                        returnStdout: true
                    ).trim()
                    
                    env.GIT_BRANCH = sh(
                        script: "git rev-parse --abbrev-ref HEAD",
                        returnStdout: true
                    ).trim()
                    
                    echo "📋 Build Information:"
                    echo "  - Build Number: ${env.BUILD_NUMBER}"
                    echo "  - Git Commit: ${env.GIT_COMMIT_SHORT}"
                    echo "  - Git Branch: ${env.GIT_BRANCH}"
                }
            }
        }
        
        stage('Build') {
            steps {
                script {
                    echo "🏗️ Building application..."
                    
                    // Install dependencies
                    sh '''
                        echo "Installing Node.js dependencies..."
                        npm ci --prefer-offline --no-audit
                    '''
                    
                    // Build the application
                    sh '''
                        echo "Building React application..."
                        npm run build
                    '''
                    
                    // Verify build output
                    sh '''
                        echo "Verifying build output..."
                        ls -la dist/
                        echo "Build completed successfully!"
                    '''
                    
                    // Archive build artifacts
                    archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
                }
            }
            post {
                success {
                    echo "✅ Build stage completed successfully"
                }
                failure {
                    echo "❌ Build stage failed"
                    currentBuild.result = 'FAILURE'
                }
            }
        }
        
        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        script {
                            echo "🧪 Running unit tests..."
                            
                            sh '''
                                echo "Running unit tests with coverage..."
                                npm run test:coverage
                            '''
                            
                            // Publish test results
                            publishTestResults testResultsPattern: 'test-results/*.xml'
                            
                            // Publish coverage reports
                            publishCoverage adapters: [
                                coberturaAdapter('coverage/cobertura-coverage.xml')
                            ], sourceFileResolver: sourceFiles('STORE_LAST_BUILD')
                        }
                    }
                    post {
                        always {
                            // Archive test results
                            archiveArtifacts artifacts: 'coverage/**/*', allowEmptyArchive: true
                        }
                    }
                }
                
                stage('E2E Tests') {
                    steps {
                        script {
                            echo "🎭 Running end-to-end tests..."
                            
                            sh '''
                                echo "Installing Playwright browsers..."
                                npx playwright install --with-deps
                                
                                echo "Running E2E tests..."
                                npm run test:e2e
                            '''
                            
                            // Publish E2E test results
                            publishTestResults testResultsPattern: 'test-results/*.xml'
                        }
                    }
                    post {
                        always {
                            // Archive E2E test results and screenshots
                            archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
                        }
                    }
                }
            }
            post {
                success {
                    echo "✅ All tests passed"
                }
                failure {
                    echo "❌ Tests failed"
                    currentBuild.result = 'FAILURE'
                }
            }
        }
        
        stage('Code Quality') {
            steps {
                script {
                    echo "🔍 Running code quality analysis..."
                    
                    // Run ESLint
                    sh '''
                        echo "Running ESLint..."
                        npm run lint
                    '''
                    
                    // Run SonarQube analysis
                    withSonarQubeEnv('SonarQube') {
                        sh '''
                            echo "Running SonarQube analysis..."
                            npx sonar-scanner \
                                -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                                -Dsonar.organization=${SONAR_ORGANIZATION} \
                                -Dsonar.sources=src \
                                -Dsonar.tests=src \
                                -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                                -Dsonar.testExecutionReportPaths=test-results/results.xml \
                                -Dsonar.coverage.exclusions=**/*.test.ts,**/*.spec.ts,**/test/**,**/tests/**
                        '''
                    }
                    
                    // Wait for SonarQube quality gate
                    timeout(time: 10, unit: 'MINUTES') {
                        def qg = waitForQualityGate()
                        if (qg.status != 'OK') {
                            error "Quality gate failed: ${qg.status}"
                        }
                    }
                }
            }
            post {
                success {
                    echo "✅ Code quality checks passed"
                }
                failure {
                    echo "❌ Code quality checks failed"
                    currentBuild.result = 'FAILURE'
                }
            }
        }
        
        stage('Security') {
            steps {
                script {
                    echo "🔒 Running security analysis..."
                    
                    // Run npm audit
                    sh '''
                        echo "Running npm audit..."
                        npm audit --audit-level=moderate
                    '''
                    
                    // Run OWASP dependency check
                    dependencyCheck additionalArguments: '--format JSON --format HTML --out dependency-check-report', odcInstallation: 'dependency-check'
                    
                    // Run Trivy vulnerability scanner on Docker image
                    sh '''
                        echo "Building Docker image for security scanning..."
                        docker build -t ${DOCKER_IMAGE_NAME}:${DOCKER_TAG} .
                        
                        echo "Running Trivy vulnerability scan..."
                        trivy image --format json --output trivy-report.json ${DOCKER_IMAGE_NAME}:${DOCKER_TAG}
                        trivy image --format table ${DOCKER_IMAGE_NAME}:${DOCKER_TAG}
                    '''
                }
            }
            post {
                always {
                    // Archive security reports
                    archiveArtifacts artifacts: 'dependency-check-report/**/*,trivy-report.json', allowEmptyArchive: true
                    
                    // Publish security reports
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'dependency-check-report',
                        reportFiles: 'dependency-check-report.html',
                        reportName: 'Dependency Check Report'
                    ])
                }
                success {
                    echo "✅ Security checks passed"
                }
                failure {
                    echo "❌ Security checks failed"
                    currentBuild.result = 'FAILURE'
                }
            }
        }
        
        stage('Docker Build & Push') {
            steps {
                script {
                    echo "🐳 Building and pushing Docker image..."
                    
                    // Build Docker image
                    sh '''
                        echo "Building Docker image..."
                        docker build -t ${DOCKER_IMAGE_NAME}:${DOCKER_TAG} .
                        docker tag ${DOCKER_IMAGE_NAME}:${DOCKER_TAG} ${DOCKER_IMAGE_NAME}:${DOCKER_LATEST_TAG}
                    '''
                    
                    // Push to registry
                    sh '''
                        echo "Pushing Docker image to registry..."
                        docker tag ${DOCKER_IMAGE_NAME}:${DOCKER_TAG} ${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:${DOCKER_TAG}
                        docker tag ${DOCKER_IMAGE_NAME}:${DOCKER_LATEST_TAG} ${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:${DOCKER_LATEST_TAG}
                        
                        docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:${DOCKER_TAG}
                        docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:${DOCKER_LATEST_TAG}
                    '''
                }
            }
            post {
                success {
                    echo "✅ Docker image built and pushed successfully"
                }
                failure {
                    echo "❌ Docker build/push failed"
                    currentBuild.result = 'FAILURE'
                }
            }
        }
        
        stage('Deploy to Test') {
            steps {
                script {
                    echo "🚀 Deploying to test environment..."
                    
                    // Deploy to test environment
                    sh '''
                        echo "Deploying to test environment..."
                        # This would typically use kubectl, docker-compose, or other deployment tools
                        # For demonstration, we'll simulate the deployment
                        
                        echo "Creating test deployment..."
                        kubectl apply -f k8s/test-deployment.yaml
                        kubectl apply -f k8s/test-service.yaml
                        kubectl apply -f k8s/test-ingress.yaml
                        
                        echo "Waiting for deployment to be ready..."
                        kubectl rollout status deployment/${APP_NAME}-test
                        
                        echo "Running health checks..."
                        sleep 30
                        curl -f ${TEST_ENV_URL}/health || exit 1
                    '''
                }
            }
            post {
                success {
                    echo "✅ Test deployment successful"
                }
                failure {
                    echo "❌ Test deployment failed"
                    currentBuild.result = 'FAILURE'
                }
            }
        }
        
        stage('Release') {
            when {
                branch 'main'
            }
            steps {
                script {
                    echo "🏷️ Creating release..."
                    
                    // Create git tag
                    sh '''
                        echo "Creating git tag..."
                        git tag -a "v${BUILD_NUMBER}" -m "Release version ${BUILD_NUMBER}"
                        git push origin "v${BUILD_NUMBER}"
                    '''
                    
                    // Create GitHub release (if using GitHub)
                    sh '''
                        echo "Creating GitHub release..."
                        gh release create "v${BUILD_NUMBER}" \
                            --title "Release v${BUILD_NUMBER}" \
                            --notes "Automated release from Jenkins build ${BUILD_NUMBER}" \
                            --target main
                    '''
                    
                    // Update version in package.json
                    sh '''
                        echo "Updating version in package.json..."
                        npm version patch --no-git-tag-version
                    '''
                }
            }
            post {
                success {
                    echo "✅ Release created successfully"
                }
                failure {
                    echo "❌ Release creation failed"
                    currentBuild.result = 'FAILURE'
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                script {
                    echo "🚀 Deploying to production environment..."
                    
                    // Deploy to production
                    sh '''
                        echo "Deploying to production environment..."
                        
                        echo "Creating production deployment..."
                        kubectl apply -f k8s/prod-deployment.yaml
                        kubectl apply -f k8s/prod-service.yaml
                        kubectl apply -f k8s/prod-ingress.yaml
                        
                        echo "Waiting for deployment to be ready..."
                        kubectl rollout status deployment/${APP_NAME}-prod
                        
                        echo "Running production health checks..."
                        sleep 60
                        curl -f ${PROD_ENV_URL}/health || exit 1
                    '''
                }
            }
            post {
                success {
                    echo "✅ Production deployment successful"
                }
                failure {
                    echo "❌ Production deployment failed"
                    currentBuild.result = 'FAILURE'
                }
            }
        }
        
        stage('Monitoring') {
            steps {
                script {
                    echo "📊 Setting up monitoring and alerting..."
                    
                    // Configure monitoring
                    sh '''
                        echo "Configuring application monitoring..."
                        
                        # Set up Prometheus metrics
                        kubectl apply -f k8s/monitoring/prometheus-config.yaml
                        
                        # Set up Grafana dashboards
                        kubectl apply -f k8s/monitoring/grafana-dashboard.yaml
                        
                        # Configure alerting rules
                        kubectl apply -f k8s/monitoring/alert-rules.yaml
                        
                        echo "Monitoring setup completed!"
                    '''
                    
                    // Send deployment notification
                    sh '''
                        echo "Sending deployment notification..."
                        curl -X POST -H 'Content-type: application/json' \
                            --data '{
                                "text": "🚀 ParkCharge Smart Rewards deployed successfully!",
                                "attachments": [{
                                    "color": "good",
                                    "fields": [{
                                        "title": "Build Number",
                                        "value": "'${BUILD_NUMBER}'",
                                        "short": true
                                    }, {
                                        "title": "Git Commit",
                                        "value": "'${GIT_COMMIT_SHORT}'",
                                        "short": true
                                    }, {
                                        "title": "Environment",
                                        "value": "Production",
                                        "short": true
                                    }]
                                }]
                            }' \
                            ${SLACK_WEBHOOK_URL}
                    '''
                }
            }
            post {
                success {
                    echo "✅ Monitoring setup completed"
                }
                failure {
                    echo "❌ Monitoring setup failed"
                    currentBuild.result = 'FAILURE'
                }
            }
        }
    }
    
    post {
        always {
            script {
                echo "🧹 Cleaning up workspace..."
                
                // Clean up Docker images
                sh '''
                    echo "Cleaning up Docker images..."
                    docker rmi ${DOCKER_IMAGE_NAME}:${DOCKER_TAG} || true
                    docker rmi ${DOCKER_IMAGE_NAME}:${DOCKER_LATEST_TAG} || true
                    docker system prune -f || true
                '''
                
                // Archive build artifacts
                archiveArtifacts artifacts: 'dist/**/*,coverage/**/*,test-results/**/*', allowEmptyArchive: true
                
                // Clean workspace
                cleanWs()
            }
        }
        
        success {
            script {
                echo "🎉 Pipeline completed successfully!"
                
                // Send success notification
                emailext (
                    subject: "✅ Build Success: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                    body: """
                        <h2>Build Successful!</h2>
                        <p><strong>Project:</strong> ${env.JOB_NAME}</p>
                        <p><strong>Build Number:</strong> ${env.BUILD_NUMBER}</p>
                        <p><strong>Git Commit:</strong> ${env.GIT_COMMIT_SHORT}</p>
                        <p><strong>Git Branch:</strong> ${env.GIT_BRANCH}</p>
                        <p><strong>Build URL:</strong> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                    """,
                    to: "${env.EMAIL_RECIPIENTS}",
                    mimeType: 'text/html'
                )
            }
        }
        
        failure {
            script {
                echo "💥 Pipeline failed!"
                
                // Send failure notification
                emailext (
                    subject: "❌ Build Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                    body: """
                        <h2>Build Failed!</h2>
                        <p><strong>Project:</strong> ${env.JOB_NAME}</p>
                        <p><strong>Build Number:</strong> ${env.BUILD_NUMBER}</p>
                        <p><strong>Git Commit:</strong> ${env.GIT_COMMIT_SHORT}</p>
                        <p><strong>Git Branch:</strong> ${env.GIT_BRANCH}</p>
                        <p><strong>Build URL:</strong> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                        <p><strong>Console Output:</strong> <a href="${env.BUILD_URL}console">${env.BUILD_URL}console</a></p>
                    """,
                    to: "${env.EMAIL_RECIPIENTS}",
                    mimeType: 'text/html'
                )
            }
        }
        
        unstable {
            script {
                echo "⚠️ Pipeline completed with warnings!"
            }
        }
    }
}
