# 🚀 AI SaaS Testing Platform

An AI-powered SaaS platform that automatically generates and executes end-to-end Playwright test suites from a single input: a website URL. Designed for QA teams, developers, and product owners who want faster, smarter, and zero-manual setup testing for web applications.

## 🧠 What is it?

The AI SaaS Testing Platform takes a website URL, intelligently scans its DOM structure using an AI agent built with Langchain and OpenAI, and generates Playwright test scripts. These scripts are executed automatically using Playwright MCP (Managed Cloud Project). Users can view detailed logs, screenshots, and rerun or regenerate tests from a modern dashboard UI.

## 🎯 Key Features

- ✅ One-Click Test Generation  
  Just input your website URL, and the system auto-generates a test suite.

- 🧠 AI Agent Powered by Langchain + OpenAI  
  Crawls the webpage DOM and crafts smart test scenarios (e.g., login, form validation, navigation flows).

- 🧪 Automated Execution with Playwright MCP  
  Scripts are run in a headless cloud environment, with logs, errors, and screenshots captured.

- 📊 Beautiful Test Dashboard  
  View test status, logs, generated scripts (Monaco editor), screenshots, and action buttons (Rerun, Regenerate).

- 🔁 CI/CD Compatible  
  Designed with APIs that can be triggered by pipelines or cron jobs.

- 🔐 (Optional) Auth System for Multi-user Support

## 💡 Why is this Unique?

Most testing tools require manual test writing or record-and-playback methods. This platform is different:
- Uses Generative AI to write real, working code.
- Supports zero manual test setup — perfect for rapid prototyping and MVP testing.
- Generates scripts in JavaScript (Playwright) — human-readable and extensible.
- Visual dashboard with live results, unlike CLI tools or local runners.

## 🏗️ Architecture Overview

User Submits URL → AI Agent (Langchain + OpenAI/Ollama) → Generate Playwright Script → Save to DB → Trigger MCP → Capture Logs/Screenshots → Show Results in Dashboard

## 🛠️ Tech Stack

Frontend: React, TailwindCSS, Axios, Monaco Editor  
Backend: Node.js or FastAPI  
AI Agent: Langchain, OpenAI/Ollama  
Test Runner: Playwright MCP  
Database: MongoDB / PostgreSQL  
DevOps: Docker, GitHub Actions

## 📁 Folder Structure

ai-saas-testing-platform/  
├── client/src
│   ├── components/  
│   ├── pages/  
│   └── services/  
├── server/  
│   ├── controllers/  
│   ├── routes/  
│   ├── public/  
│   └── models/  
└── README.md

## ⚙️ Getting Started – Local Development Setup

### ✅ Prerequisites

- Node.js v18+  
- Python 3.10+ (if using FastAPI backend)  
- MongoDB or PostgreSQL  
- OpenAI API Key  or Ollama to run locally
- Playwright MCP Access Key 

### 1. Clone the Repository

git clone https://github.com/your-username/ai-saas-testing-platform.git  
cd ai-saas-testing-platform

### 2. Setup Backend

#### Option A: Node.js

cd server 
npm install  
node server.js

### 3. Setup Frontend

cd client
npm install  
npm run start

Frontend → http://localhost:5000 
Backend →  http://localhost:5000 (Node.js)

## 🔐 Environment Variables (Example)

OPENAI_API_KEY=your_openai_key  or Use ollama in free to access Locally
MONGODB_URI=
MCP_API_KEY=
BASE_URL=http://localhost:5000

## 🧪 Testing the Platform

1. Open http://localhost:5000 
2. Input test site URL (e.g., https://automationexercise.com or https://www.demoblaze.com)  
3. Click "Generate Tests"  
4. View logs, screenshots, and scripts in the dashboard


## 🙌 Contributing

Fork the repo → Create a branch → Make changes → Submit a PR  
Suggestions & improvements welcome!



## 💬 Contact

Built by [Ritesh Thakur](https://github.com/riteshh-thakur)  
For queries or collaborations, feel free to reach out on GitHub
