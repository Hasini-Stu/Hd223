# 🚀 Quick Reference Guide - ParkCharge Smart Rewards DevOps Pipeline

## 🏃‍♂️ Quick Start

```bash
# 1. Run the setup script
./setup-devops.sh

# 2. Start development
npm run dev

# 3. Run tests
npm run test

# 4. Build for production
npm run build
```

## 📋 Essential Commands

### Development
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
```

### Testing
```bash
npm run test             # Run unit tests (watch mode)
npm run test:run         # Run unit tests once
npm run test:coverage    # Run tests with coverage
npm run test:e2e         # Run end-to-end tests
npm run test:e2e:ui      # Run E2E tests with UI
```

### Docker
```bash
docker build -t parkcharge-smart-rewards .     # Build image
docker run -p 3000:3000 parkcharge-smart-rewards  # Run container
docker-compose up                              # Start all services
docker-compose down                            # Stop all services
```

### Kubernetes
```bash
kubectl get pods -A                           # List all pods
kubectl get services -n test                  # List test services
kubectl get ingress -n production             # List production ingress
kubectl logs -f deployment/parkcharge-smart-rewards-prod -n production  # View logs
kubectl port-forward svc/prometheus-grafana 3000:80 -n monitoring  # Access Grafana
```

### Git
```bash
git add .                                      # Stage all changes
git commit -m "Your message"                   # Commit changes
git push origin main                           # Push to main branch
git tag -a "v1.0.0" -m "Release v1.0.0"      # Create release tag
```

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `Jenkinsfile` | Complete CI/CD pipeline |
| `Dockerfile` | Multi-stage container build |
| `docker-compose.yml` | Local development setup |
| `k8s/test-deployment.yaml` | Test environment deployment |
| `k8s/prod-deployment.yaml` | Production deployment |
| `vitest.config.ts` | Unit testing configuration |
| `playwright.config.ts` | E2E testing configuration |
| `sonar-project.properties` | Code quality configuration |

## 🌐 URLs and Ports

| Service | URL | Port |
|---------|-----|------|
| Development Server | http://localhost:8080 | 8080 |
| Production Build | http://localhost:4173 | 4173 |
| Docker Container | http://localhost:3000 | 3000 |
| Jenkins | http://localhost:8080 | 8080 |
| Grafana | http://localhost:3000 | 3000 |
| Prometheus | http://localhost:9090 | 9090 |
| SonarQube | http://localhost:9000 | 9000 |

## 🚨 Troubleshooting

### Common Issues

**Build fails:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Docker build fails:**
```bash
# Check Docker is running
docker info

# Build with no cache
docker build --no-cache -t parkcharge-smart-rewards .
```

**Tests fail:**
```bash
# Install Playwright browsers
npx playwright install

# Run tests locally
npm run test:run
```

**Kubernetes issues:**
```bash
# Check cluster connection
kubectl cluster-info

# Check pod status
kubectl get pods -A

# View pod logs
kubectl logs <pod-name> -n <namespace>
```

## 📊 Pipeline Stages

1. **Checkout** - Git repository checkout
2. **Build** - React application build
3. **Test** - Unit and E2E tests
4. **Code Quality** - ESLint and SonarQube
5. **Security** - Vulnerability scanning
6. **Docker Build** - Container creation
7. **Deploy Test** - Test environment deployment
8. **Release** - Git tagging and versioning
9. **Deploy Prod** - Production deployment
10. **Monitoring** - Setup monitoring and alerts

## 🔑 Environment Variables

```bash
# Required for Jenkins pipeline
DOCKER_REGISTRY=your-registry.com
SONAR_PROJECT_KEY=parkcharge-smart-rewards
SONAR_ORGANIZATION=your-org
SLACK_WEBHOOK_URL=your-slack-webhook
EMAIL_RECIPIENTS=devops@parkcharge.com
```

## 📱 Monitoring Commands

```bash
# Check application health
curl -f http://localhost:3000/health

# View Prometheus metrics
curl http://localhost:9090/metrics

# Access Grafana dashboard
kubectl port-forward svc/prometheus-grafana 3000:80 -n monitoring
```

## 🆘 Emergency Procedures

**Rollback deployment:**
```bash
kubectl rollout undo deployment/parkcharge-smart-rewards-prod -n production
```

**Scale down service:**
```bash
kubectl scale deployment parkcharge-smart-rewards-prod --replicas=0 -n production
```

**Check service status:**
```bash
kubectl get all -n production
kubectl describe deployment parkcharge-smart-rewards-prod -n production
```

## 📚 Documentation

- **Full Implementation Guide**: `IMPLEMENTATION-GUIDE.md`
- **DevOps Documentation**: `README-DEVOPS.md`
- **Project README**: `README.md`

## 🎯 Success Criteria

- ✅ All tests passing
- ✅ Code quality gates passed
- ✅ Security scans clean
- ✅ Docker image built and pushed
- ✅ Deployed to test environment
- ✅ Health checks passing
- ✅ Monitoring configured
- ✅ Alerts working

---

**Need help?** Check the full `IMPLEMENTATION-GUIDE.md` for detailed step-by-step instructions!
