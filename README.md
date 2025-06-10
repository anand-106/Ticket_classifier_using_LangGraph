# <div align="center">🎫 Ticket Classifier using LangGraph</div>

<div align="center">
An intelligent ticket classification system powered by LangGraph and LangChain, featuring a modern React frontend and a robust Python backend.

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![Auth0](https://img.shields.io/badge/Auth0-EB5424?style=for-the-badge&logo=auth0&logoColor=white)](https://auth0.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)

[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)

</div>

## 📋 Overview

This project implements an advanced ticket classification system that leverages the power of LangGraph for intelligent workflow management and LangChain for robust language processing. It combines modern frontend technologies with a sophisticated backend architecture to deliver a seamless ticket classification experience.

## 🚀 Key Features & Technologies

### Frontend Technologies
- Built with [React](https://react.dev/) 19.1.0 for optimal performance
- [Auth0](https://auth0.com/) integration for secure authentication
- [TailwindCSS](https://tailwindcss.com/) for modern, utility-first styling
- [React Router](https://reactrouter.com/) v7 for client-side routing

### Backend Technologies
- [LangGraph](https://github.com/langchain-ai/langgraph) for orchestrating complex language processing workflows
- [LangChain](https://www.langchain.com/) for building language model applications
- [Ollama](https://ollama.ai/) integration for local language model deployment
- FastAPI (implied by structure) for RESTful API endpoints

## 🛠️ Technical Highlights

- **Graph-Based Workflow**: Implements sophisticated ticket processing using LangGraph's DAG-based workflow system
- **Modern Authentication**: Leverages [JWT (JSON Web Tokens)](https://jwt.io/) for secure API communication
- **Reactive State Management**: Uses React's latest features for efficient state handling
- **API Integration**: Implements [Axios](https://axios-http.com/) for robust HTTP client functionality

## 🔄 System Architecture & Workflow

### Authentication Flow
1. Users authenticate through [Auth0](https://auth0.com/), receiving a JWT token
2. Backend validates tokens using Auth0's JWKS endpoint
3. Role-based access control (RBAC) is implemented using Auth0 roles and custom middleware
4. Protected endpoints verify both token validity and user roles

### Ticket Classification Process
1. User submits a ticket through the React frontend
2. Request is authenticated using JWT middleware
3. The ticket goes through a LangGraph-powered classification pipeline:
   - Initial classification by `MessageClassifier` into React/Java/Python/SQL categories
   - Routing to specialized agents based on classification
   - Detailed analysis by domain-specific agents
4. Each specialized agent (React/Java/Python/SQL) provides:
   - Issue summary
   - Technical analysis
   - Priority assessment
   - Suggested approach
   - Additional technical context

### Team-Based Routing
- React issues → Frontend team
- Java issues → Backend Java team
- Python issues → Backend Python team
- SQL issues → Database team

Each team receives tickets with structured JSON responses containing detailed analysis and priority levels.

## 📁 Project Structure

```
.
├── frontend/
│   ├── src/
│   ├── public/
│   └── node_modules/
├── Backend/
│   ├── Auth/
│   ├── Database/
│   └── __pycache__/
└── Graph.png
```

### Key Directories
- `frontend/`: Contains the React application with TailwindCSS integration
- `Backend/Auth/`: Handles authentication and authorization logic
- `Backend/Database/`: Manages data persistence and database operations

## 🔗 External Dependencies

### Frontend
- [@auth0/auth0-react](https://github.com/auth0/auth0-react) - v2.3.0
- [axios](https://axios-http.com/) - v1.9.0
- [tailwindcss](https://tailwindcss.com/) - v3.4.17

### Backend
- [langgraph](https://github.com/langchain-ai/langgraph) - v0.0.15
- [langchain](https://github.com/langchain-ai/langchain) - v0.1.0
- [langchain-ollama](https://github.com/langchain-ai/langchain/tree/master/libs/langchain-ollama) - v0.0.3

## 📄 License

This project is open source and available under the MIT license. 