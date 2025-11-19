# Azure Web Application with PostgreSQL

A simple web application deployed on Azure App Service that connects to PostgreSQL database with secure credential management through Azure Key Vault.

## Architecture Overview

- **Application**: Web app with `/hello` endpoint
- **Hosting**: Azure App Service (deployed via Portal)
- **Database**: Azure Database for PostgreSQL (configured via CLI with IP restrictions)
- **Secret Management**: Azure Key Vault (configured via CLI with restricted management access)
- **Git Workflow**: Git-Flow branching strategy


## Components

### Web Application
- **Endpoint**: `/hello`
- **Functionality**: Connects to PostgreSQL database and retrieves data
- **Deployment**: Azure App Service via Azure Portal
- **Access**: Public endpoint

### PostgreSQL Database
- **Deployment**: Azure CLI
- **Access**: Public with IP restrictions
- **Security**: Credentials stored in Key Vault

### Azure Key Vault
- **Deployment**: Azure CLI
- **Access**: Public endpoint with restricted management
- **Purpose**: Secure storage of database connection strings and credentials

## Git-Flow Workflow

This project follows the Git-Flow branching model:

- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: Feature branches
- `release/*`: Release preparation branches
- `hotfix/*`: Emergency fixes for production

## Release notes
Version: 1.0.0