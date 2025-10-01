#!/bin/bash

# ParkCharge Smart Rewards - DevOps Pipeline Setup Script
# This script helps you set up the development environment quickly

set -e

echo "🚀 ParkCharge Smart Rewards - DevOps Pipeline Setup"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    local missing_tools=()
    
    if ! command_exists node; then
        missing_tools+=("node")
    fi
    
    if ! command_exists npm; then
        missing_tools+=("npm")
    fi
    
    if ! command_exists docker; then
        missing_tools+=("docker")
    fi
    
    if ! command_exists kubectl; then
        missing_tools+=("kubectl")
    fi
    
    if ! command_exists git; then
        missing_tools+=("git")
    fi
    
    if [ ${#missing_tools[@]} -ne 0 ]; then
        print_error "Missing required tools: ${missing_tools[*]}"
        print_status "Please install the missing tools and run this script again."
        exit 1
    fi
    
    print_success "All prerequisites are installed!"
}

# Install project dependencies
install_dependencies() {
    print_status "Installing project dependencies..."
    
    if [ ! -f "package.json" ]; then
        print_error "package.json not found. Are you in the correct directory?"
        exit 1
    fi
    
    npm install
    print_success "Dependencies installed successfully!"
}

# Install Playwright browsers
install_playwright() {
    print_status "Installing Playwright browsers..."
    npx playwright install --with-deps
    print_success "Playwright browsers installed!"
}

# Set up Git repository
setup_git() {
    print_status "Setting up Git repository..."
    
    if [ ! -d ".git" ]; then
        git init
        print_success "Git repository initialized!"
    else
        print_status "Git repository already exists."
    fi
    
    # Check if remote exists
    if ! git remote get-url origin >/dev/null 2>&1; then
        print_warning "No remote origin found. Please add your remote repository:"
        print_status "git remote add origin <your-repository-url>"
    else
        print_success "Remote origin is configured!"
    fi
}

# Build the application
build_application() {
    print_status "Building the application..."
    npm run build
    
    if [ -d "dist" ]; then
        print_success "Application built successfully!"
    else
        print_error "Build failed. Please check the build output."
        exit 1
    fi
}

# Run tests
run_tests() {
    print_status "Running tests..."
    
    # Run unit tests
    print_status "Running unit tests..."
    npm run test:run
    
    # Run linting
    print_status "Running linting..."
    npm run lint
    
    print_success "All tests passed!"
}

# Build Docker image
build_docker() {
    print_status "Building Docker image..."
    
    if ! command_exists docker; then
        print_warning "Docker not found. Skipping Docker build."
        return
    fi
    
    # Check if Docker is running
    if ! docker info >/dev/null 2>&1; then
        print_warning "Docker is not running. Please start Docker and try again."
        return
    fi
    
    docker build -t parkcharge-smart-rewards:latest .
    print_success "Docker image built successfully!"
}

# Set up local Kubernetes (minikube)
setup_minikube() {
    print_status "Setting up local Kubernetes with minikube..."
    
    if ! command_exists minikube; then
        print_warning "minikube not found. Please install minikube to use local Kubernetes."
        return
    fi
    
    # Check if minikube is running
    if ! minikube status >/dev/null 2>&1; then
        print_status "Starting minikube..."
        minikube start --driver=docker
    else
        print_status "minikube is already running."
    fi
    
    # Enable ingress
    print_status "Enabling ingress addon..."
    minikube addons enable ingress
    
    print_success "minikube setup completed!"
}

# Create Kubernetes namespaces
create_namespaces() {
    print_status "Creating Kubernetes namespaces..."
    
    if ! command_exists kubectl; then
        print_warning "kubectl not found. Skipping namespace creation."
        return
    fi
    
    # Check if kubectl can connect to cluster
    if ! kubectl cluster-info >/dev/null 2>&1; then
        print_warning "Cannot connect to Kubernetes cluster. Skipping namespace creation."
        return
    fi
    
    kubectl create namespace test --dry-run=client -o yaml | kubectl apply -f -
    kubectl create namespace production --dry-run=client -o yaml | kubectl apply -f -
    kubectl create namespace monitoring --dry-run=client -o yaml | kubectl apply -f -
    
    print_success "Kubernetes namespaces created!"
}

# Display next steps
show_next_steps() {
    echo ""
    echo "🎉 Setup completed successfully!"
    echo "================================"
    echo ""
    echo "Next steps:"
    echo "1. 📖 Read the IMPLEMENTATION-GUIDE.md for detailed setup instructions"
    echo "2. 🔧 Set up Jenkins server and configure the pipeline"
    echo "3. 🐳 Configure your container registry (Docker Hub, AWS ECR, etc.)"
    echo "4. ☸️  Set up Kubernetes cluster for deployment"
    echo "5. 🔍 Configure SonarQube for code quality analysis"
    echo "6. 📊 Set up monitoring with Prometheus and Grafana"
    echo ""
    echo "Quick commands to get started:"
    echo "• Run tests: npm run test"
    echo "• Build app: npm run build"
    echo "• Start dev server: npm run dev"
    echo "• Build Docker: docker build -t parkcharge-smart-rewards ."
    echo "• Run Docker: docker run -p 3000:3000 parkcharge-smart-rewards"
    echo ""
    echo "For detailed instructions, see: IMPLEMENTATION-GUIDE.md"
}

# Main execution
main() {
    echo "Starting DevOps pipeline setup..."
    echo ""
    
    check_prerequisites
    install_dependencies
    install_playwright
    setup_git
    build_application
    run_tests
    build_docker
    setup_minikube
    create_namespaces
    show_next_steps
}

# Run main function
main "$@"
