# ParkCharge Smart Rewards - DevOps Pipeline

This document describes the complete DevOps pipeline implementation for the ParkCharge Smart Rewards application.

## 🏗️ Pipeline Overview

The Jenkins pipeline includes the following stages:

1. **Checkout** - Retrieves code from Git repository
2. **Build** - Builds the React application and creates artifacts
3. **Test** - Runs unit tests and E2E tests
4. **Code Quality** - Performs linting and SonarQube analysis
5. **Security** - Runs security scans and vulnerability checks
6. **Docker Build & Push** - Creates and pushes Docker images
7. **Deploy to Test** - Deploys to test environment
8. **Release** - Creates releases and tags
9. **Deploy to Production** - Deploys to production environment
10. **Monitoring** - Sets up monitoring and alerting

## 🚀 Getting Started

### Prerequisites

- Jenkins with required plugins
- Docker
- Kubernetes cluster
- SonarQube server
- Prometheus & Grafana for monitoring

### Required Jenkins Plugins

- Pipeline
- Docker Pipeline
- Kubernetes
- SonarQube Scanner
- HTML Publisher
- Test Results Analyzer
- Coverage
- Email Extension
- Slack Notification

### Environment Variables

Configure the following environment variables in Jenkins:

```bash
DOCKER_REGISTRY=your-registry.com
SONAR_PROJECT_KEY=parkcharge-smart-rewards
SONAR_ORGANIZATION=your-org
SLACK_WEBHOOK_URL=your-slack-webhook
EMAIL_RECIPIENTS=devops@parkcharge.com
```

## 📋 Pipeline Stages Details

### 1. Build Stage
- Installs Node.js dependencies
- Builds the React application using Vite
- Creates production-ready build artifacts
- Archives build outputs

### 2. Test Stage
- **Unit Tests**: Runs Vitest with coverage reporting
- **E2E Tests**: Runs Playwright tests across multiple browsers
- Publishes test results and coverage reports
- Archives test artifacts

### 3. Code Quality Stage
- Runs ESLint for code linting
- Performs SonarQube analysis
- Waits for quality gate results
- Fails pipeline if quality standards not met

### 4. Security Stage
- Runs npm audit for dependency vulnerabilities
- Performs OWASP dependency check
- Scans Docker images with Trivy
- Publishes security reports

### 5. Docker Build & Push
- Builds Docker image with multi-stage build
- Tags images with build number and latest
- Pushes to container registry
- Optimizes image size and security

### 6. Deploy to Test
- Deploys to Kubernetes test environment
- Runs health checks
- Verifies deployment success
- Uses test-specific configurations

### 7. Release Stage
- Creates Git tags for releases
- Updates version numbers
- Creates GitHub releases (if applicable)
- Only runs on main branch

### 8. Deploy to Production
- Deploys to production Kubernetes cluster
- Performs rolling updates
- Runs comprehensive health checks
- Only runs on main branch

### 9. Monitoring Stage
- Configures Prometheus metrics collection
- Sets up Grafana dashboards
- Configures alerting rules
- Sends deployment notifications

## 🐳 Docker Configuration

### Multi-stage Dockerfile
- **Base stage**: Node.js 18 Alpine
- **Dependencies stage**: Installs production dependencies
- **Builder stage**: Builds the application
- **Runner stage**: Nginx Alpine for serving static files

### Docker Compose
Includes services for:
- Application
- Nginx reverse proxy
- Prometheus monitoring
- Grafana dashboards
- Alertmanager

## ☸️ Kubernetes Deployment

### Test Environment
- 2 replicas
- Resource limits: 256Mi memory, 200m CPU
- Health checks configured
- Test-specific ingress

### Production Environment
- 3 replicas
- Resource limits: 512Mi memory, 500m CPU
- Enhanced security context
- Production ingress with SSL

## 📊 Monitoring & Alerting

### Prometheus Metrics
- HTTP request metrics
- Application performance metrics
- Kubernetes pod metrics
- Custom business metrics

### Grafana Dashboards
- Request rate and response time
- Error rates and status codes
- Resource utilization
- Custom application metrics

### Alert Rules
- High error rate alerts
- High response time alerts
- Pod crash loop detection
- Resource usage alerts
- Service availability alerts

## 🧪 Testing Strategy

### Unit Tests
- Vitest framework
- React Testing Library
- 80% coverage threshold
- Component and utility testing

### E2E Tests
- Playwright framework
- Cross-browser testing
- Mobile responsiveness
- Accessibility testing

## 🔒 Security Measures

### Container Security
- Non-root user execution
- Read-only root filesystem
- Minimal base images
- Security context restrictions

### Dependency Security
- Regular vulnerability scanning
- Automated security updates
- OWASP dependency check
- Trivy image scanning

### Network Security
- TLS/SSL termination
- Security headers
- Rate limiting
- CORS configuration

## 📈 Quality Gates

### Code Quality
- ESLint compliance
- SonarQube quality gate
- Code coverage thresholds
- Technical debt limits

### Security
- No high-severity vulnerabilities
- Dependency security compliance
- Container security scanning
- Infrastructure security checks

## 🚨 Notifications

### Slack Integration
- Build status notifications
- Deployment alerts
- Error notifications
- Custom channel routing

### Email Notifications
- Build success/failure alerts
- Detailed build information
- HTML-formatted reports
- Team distribution lists

## 🔧 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify dependency installation
   - Review build logs

2. **Test Failures**
   - Update test configurations
   - Check test environment setup
   - Review test data

3. **Deployment Issues**
   - Verify Kubernetes cluster access
   - Check resource availability
   - Review deployment configurations

4. **Monitoring Issues**
   - Verify Prometheus configuration
   - Check Grafana data sources
   - Review alert rule syntax

### Debug Commands

```bash
# Check pod status
kubectl get pods -n production

# View pod logs
kubectl logs -f deployment/parkcharge-smart-rewards-prod

# Check service endpoints
kubectl get endpoints -n production

# Verify ingress configuration
kubectl describe ingress parkcharge-smart-rewards-prod-ingress -n production
```

## 📚 Additional Resources

- [Jenkins Pipeline Documentation](https://www.jenkins.io/doc/book/pipeline/)
- [Kubernetes Deployment Guide](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Prometheus Monitoring](https://prometheus.io/docs/)
- [Grafana Dashboards](https://grafana.com/docs/)

## 🤝 Contributing

1. Follow the established pipeline structure
2. Update tests for new features
3. Maintain security standards
4. Document configuration changes
5. Test in development environment first

## 📞 Support

For DevOps pipeline issues:
- Check Jenkins build logs
- Review Kubernetes cluster status
- Verify monitoring dashboards
- Contact DevOps team: devops@parkcharge.com
