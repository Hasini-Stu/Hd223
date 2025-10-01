# 🚀 Complete Implementation Guide - ParkCharge Smart Rewards DevOps Pipeline

This guide will walk you through setting up and running the complete DevOps pipeline from scratch.

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [ ] **Git Repository** (GitHub, GitLab, or Bitbucket)
- [ ] **Jenkins Server** (local or cloud)
- [ ] **Docker** installed and running
- [ ] **Kubernetes Cluster** (local or cloud)
- [ ] **Container Registry** (Docker Hub, AWS ECR, etc.)
- [ ] **SonarQube Server** (cloud or self-hosted)
- [ ] **Domain/URLs** for test and production environments

## 🎯 Phase 1: Environment Setup

### Step 1.1: Set Up Git Repository

1. **Create a new repository** on your preferred Git platform:
   ```bash
   # If using GitHub CLI
   gh repo create parkcharge-smart-rewards --public
   
   # Or create manually on GitHub/GitLab/Bitbucket
   ```

2. **Add remote origin** to your local repository:
   ```bash
   cd /Users/hasinidealwis/Downloads/parkcharge-smart-rewards-main
   git remote add origin https://github.com/yourusername/parkcharge-smart-rewards.git
   git branch -M main
   git push -u origin main
   ```

3. **Verify repository setup**:
   ```bash
   git remote -v
   git status
   ```

### Step 1.2: Install Required Tools

#### Install Docker
```bash
# macOS (using Homebrew)
brew install --cask docker

# Or download from: https://www.docker.com/products/docker-desktop

# Verify installation
docker --version
docker-compose --version
```

#### Install Kubernetes Tools
```bash
# Install kubectl
brew install kubectl

# Install minikube for local development
brew install minikube

# Start minikube
minikube start

# Verify installation
kubectl version --client
```

#### Install Additional Tools
```bash
# Install Node.js (if not already installed)
brew install node@18

# Install project dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## 🏗️ Phase 2: Jenkins Setup

### Step 2.1: Install Jenkins

#### Option A: Local Jenkins Installation
```bash
# macOS with Homebrew
brew install jenkins

# Start Jenkins
brew services start jenkins

# Access Jenkins at: http://localhost:8080
```

#### Option B: Docker Jenkins
```bash
# Create Jenkins directory
mkdir jenkins-data

# Run Jenkins in Docker
docker run -d \
  --name jenkins \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins-data:/var/jenkins_home \
  jenkins/jenkins:lts

# Get initial admin password
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

### Step 2.2: Configure Jenkins

1. **Access Jenkins**: Open http://localhost:8080
2. **Install suggested plugins** during setup
3. **Create admin user**
4. **Install required plugins**:

   Go to **Manage Jenkins** → **Manage Plugins** → **Available** and install:
   - Pipeline
   - Docker Pipeline
   - Kubernetes
   - SonarQube Scanner
   - HTML Publisher
   - Test Results Analyzer
   - Coverage
   - Email Extension
   - Slack Notification
   - Blue Ocean (optional, for better UI)

### Step 2.3: Configure Jenkins Credentials

1. **Go to**: Manage Jenkins → Manage Credentials → System → Global credentials
2. **Add credentials** for:
   - **Docker Registry**: Username/Password for your container registry
   - **GitHub**: Personal Access Token for repository access
   - **SonarQube**: Token for code quality analysis
   - **Slack**: Webhook URL for notifications
   - **Kubernetes**: Kubeconfig for cluster access

### Step 2.4: Configure Jenkins Global Tools

1. **Go to**: Manage Jenkins → Global Tool Configuration
2. **Configure**:
   - **NodeJS**: Install Node.js 18.x
   - **Docker**: Use system Docker installation
   - **SonarQube Scanner**: Install latest version

## 🐳 Phase 3: Container Registry Setup

### Step 3.1: Choose and Set Up Registry

#### Option A: Docker Hub
```bash
# Login to Docker Hub
docker login

# Create repository on Docker Hub website
# Repository name: yourusername/parkcharge-smart-rewards
```

#### Option B: AWS ECR
```bash
# Install AWS CLI
brew install awscli

# Configure AWS credentials
aws configure

# Create ECR repository
aws ecr create-repository --repository-name parkcharge-smart-rewards

# Get login token
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com
```

#### Option C: Google Container Registry
```bash
# Install Google Cloud SDK
brew install google-cloud-sdk

# Authenticate
gcloud auth login

# Configure Docker
gcloud auth configure-docker

# Create repository (automatic on first push)
```

### Step 3.2: Update Jenkinsfile Configuration

Update the `DOCKER_REGISTRY` environment variable in your Jenkinsfile:

```groovy
environment {
    DOCKER_REGISTRY = 'your-registry-url'  // e.g., 'yourusername' for Docker Hub
    // or '123456789012.dkr.ecr.us-east-1.amazonaws.com' for AWS ECR
}
```

## ☸️ Phase 4: Kubernetes Setup

### Step 4.1: Set Up Kubernetes Cluster

#### Option A: Local Development (Minikube)
```bash
# Start minikube
minikube start --driver=docker

# Enable ingress addon
minikube addons enable ingress

# Get cluster info
kubectl cluster-info
```

#### Option B: Cloud Provider
- **AWS EKS**: Follow AWS EKS setup guide
- **Google GKE**: Follow Google GKE setup guide
- **Azure AKS**: Follow Azure AKS setup guide

### Step 4.2: Create Namespaces
```bash
# Create namespaces
kubectl create namespace test
kubectl create namespace production
kubectl create namespace monitoring

# Verify namespaces
kubectl get namespaces
```

### Step 4.3: Set Up Ingress Controller
```bash
# Install NGINX Ingress Controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml

# Wait for ingress controller to be ready
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=120s
```

## 🔍 Phase 5: SonarQube Setup

### Step 5.1: Set Up SonarQube

#### Option A: SonarCloud (Recommended)
1. **Go to**: https://sonarcloud.io
2. **Sign up** with your Git provider
3. **Create organization** and project
4. **Get project key** and organization key
5. **Generate token** for Jenkins integration

#### Option B: Self-Hosted SonarQube
```bash
# Run SonarQube with Docker
docker run -d \
  --name sonarqube \
  -p 9000:9000 \
  -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true \
  sonarqube:latest

# Access at: http://localhost:9000
# Default credentials: admin/admin
```

### Step 5.2: Configure SonarQube in Jenkins

1. **Go to**: Manage Jenkins → Configure System
2. **Add SonarQube server**:
   - Name: SonarQube
   - Server URL: https://sonarcloud.io (or your server URL)
   - Token: Your SonarQube token

## 📊 Phase 6: Monitoring Setup

### Step 6.1: Install Prometheus and Grafana

```bash
# Create monitoring namespace (if not exists)
kubectl create namespace monitoring

# Install Prometheus using Helm
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Install Prometheus
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --set grafana.adminPassword=admin

# Wait for pods to be ready
kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=grafana -n monitoring --timeout=300s
```

### Step 6.2: Access Monitoring Dashboards

```bash
# Port forward to access Grafana
kubectl port-forward -n monitoring svc/prometheus-grafana 3000:80

# Access Grafana at: http://localhost:3000
# Username: admin
# Password: admin
```

## 🔧 Phase 7: Jenkins Pipeline Configuration

### Step 7.1: Create Jenkins Pipeline Job

1. **Go to**: Jenkins Dashboard → New Item
2. **Select**: Pipeline
3. **Name**: parkcharge-smart-rewards-pipeline
4. **Configure**:
   - **Pipeline**: Definition from SCM
   - **SCM**: Git
   - **Repository URL**: Your Git repository URL
   - **Branch**: */main
   - **Script Path**: Jenkinsfile

### Step 7.2: Configure Environment Variables

1. **Go to**: Pipeline job → Configure
2. **Add environment variables**:
   ```groovy
   environment {
       DOCKER_REGISTRY = 'your-registry-url'
       SONAR_PROJECT_KEY = 'your-sonar-project-key'
       SONAR_ORGANIZATION = 'your-sonar-organization'
       SLACK_WEBHOOK_URL = 'your-slack-webhook-url'
       EMAIL_RECIPIENTS = 'your-email@domain.com'
   }
   ```

### Step 7.3: Configure Notifications

#### Slack Integration
1. **Create Slack App**: https://api.slack.com/apps
2. **Enable Incoming Webhooks**
3. **Create webhook** for your channel
4. **Add webhook URL** to Jenkins environment variables

#### Email Configuration
1. **Go to**: Manage Jenkins → Configure System
2. **Configure SMTP settings**:
   - SMTP server: smtp.gmail.com (or your SMTP server)
   - Port: 587
   - Authentication: Your email credentials

## 🧪 Phase 8: Testing the Pipeline

### Step 8.1: Run Initial Build

1. **Trigger pipeline**: Click "Build Now" in Jenkins
2. **Monitor build progress** in Blue Ocean or console output
3. **Check each stage** for success/failure

### Step 8.2: Verify Build Artifacts

```bash
# Check if Docker image was built
docker images | grep parkcharge-smart-rewards

# Check if image was pushed to registry
docker pull your-registry/parkcharge-smart-rewards:latest
```

### Step 8.3: Verify Deployment

```bash
# Check test deployment
kubectl get pods -n test
kubectl get services -n test
kubectl get ingress -n test

# Check production deployment (if on main branch)
kubectl get pods -n production
kubectl get services -n production
kubectl get ingress -n production
```

## 🔍 Phase 9: Troubleshooting Common Issues

### Issue 1: Build Failures

**Problem**: npm install fails
**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 2: Docker Build Failures

**Problem**: Docker build context too large
**Solution**:
```bash
# Check .dockerignore file
cat .dockerignore

# Build with smaller context
docker build --no-cache -t parkcharge-smart-rewards .
```

### Issue 3: Kubernetes Deployment Issues

**Problem**: Pods not starting
**Solution**:
```bash
# Check pod status
kubectl describe pod <pod-name> -n test

# Check logs
kubectl logs <pod-name> -n test

# Check resource limits
kubectl top pods -n test
```

### Issue 4: SonarQube Analysis Failures

**Problem**: SonarQube token issues
**Solution**:
1. **Regenerate token** in SonarQube
2. **Update Jenkins credentials**
3. **Check project key** in sonar-project.properties

### Issue 5: Test Failures

**Problem**: E2E tests failing
**Solution**:
```bash
# Install Playwright browsers
npx playwright install

# Run tests locally
npm run test:e2e

# Check test results
ls -la test-results/
```

## 📈 Phase 10: Monitoring and Maintenance

### Step 10.1: Set Up Monitoring Alerts

1. **Access Grafana**: http://localhost:3000
2. **Import dashboard** from k8s/monitoring/grafana-dashboard.yaml
3. **Configure alert channels** (Slack, Email)
4. **Set up alert rules** from k8s/monitoring/alert-rules.yaml

### Step 10.2: Regular Maintenance Tasks

#### Weekly Tasks
- [ ] Review build logs for errors
- [ ] Check security scan results
- [ ] Monitor resource usage
- [ ] Update dependencies

#### Monthly Tasks
- [ ] Review and update Docker base images
- [ ] Update Kubernetes cluster
- [ ] Review and update monitoring dashboards
- [ ] Security audit and updates

### Step 10.3: Performance Optimization

```bash
# Monitor resource usage
kubectl top nodes
kubectl top pods -n production

# Check build times
# Optimize Docker layers
# Review test execution time
```

## 🚀 Phase 11: Production Deployment

### Step 11.1: Pre-Production Checklist

- [ ] All tests passing
- [ ] Security scans clean
- [ ] Code quality gates passed
- [ ] Monitoring configured
- [ ] Backup procedures in place
- [ ] Rollback plan ready

### Step 11.2: Production Deployment

1. **Merge to main branch**:
   ```bash
   git checkout main
   git merge develop
   git push origin main
   ```

2. **Monitor deployment** in Jenkins
3. **Verify production health**:
   ```bash
   curl -f https://your-production-url/health
   ```

4. **Check monitoring dashboards**
5. **Verify all services** are running

## 📚 Additional Resources

### Documentation Links
- [Jenkins Pipeline Documentation](https://www.jenkins.io/doc/book/pipeline/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [SonarQube Documentation](https://docs.sonarqube.org/)
- [Prometheus Documentation](https://prometheus.io/docs/)

### Useful Commands Reference

```bash
# Jenkins
# View build logs
# Trigger build
# Check build status

# Docker
docker build -t parkcharge-smart-rewards .
docker run -p 3000:3000 parkcharge-smart-rewards
docker push your-registry/parkcharge-smart-rewards:latest

# Kubernetes
kubectl get pods -A
kubectl logs -f deployment/parkcharge-smart-rewards-prod -n production
kubectl describe pod <pod-name> -n production
kubectl port-forward svc/prometheus-grafana 3000:80 -n monitoring

# Git
git add .
git commit -m "Your commit message"
git push origin main
```

## 🆘 Support and Help

### Getting Help
1. **Check logs** first: Jenkins console output, Kubernetes pod logs
2. **Review documentation**: Each tool's official documentation
3. **Community forums**: Stack Overflow, GitHub Issues
4. **Professional support**: Consider paid support for production systems

### Emergency Procedures
1. **Rollback deployment**: `kubectl rollout undo deployment/parkcharge-smart-rewards-prod -n production`
2. **Scale down**: `kubectl scale deployment parkcharge-smart-rewards-prod --replicas=0 -n production`
3. **Check monitoring**: Grafana dashboards and Prometheus alerts
4. **Contact team**: Use established communication channels

---

## 🎉 Congratulations!

You now have a complete, production-ready DevOps pipeline! This implementation includes:

- ✅ **10 Pipeline Stages** (exceeding the 4-stage requirement)
- ✅ **Automated Testing** (Unit + E2E)
- ✅ **Code Quality Analysis**
- ✅ **Security Scanning**
- ✅ **Container Orchestration**
- ✅ **Monitoring & Alerting**
- ✅ **Automated Deployment**
- ✅ **Release Management**

Your pipeline follows industry best practices and is ready for production use. Remember to regularly maintain and update your pipeline as your application evolves.

**Next Steps**: Start with Phase 1 and work through each phase systematically. Don't hesitate to refer back to this guide or seek help from the community if you encounter any issues.
