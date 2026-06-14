# City-Agent

### Autonomous Municipal Workforce for Aging Societies

City-Agent is an AI-powered municipal operations platform designed to automate document processing, department coordination, and citizen service workflows in aging societies facing workforce shortages.

The system analyzes uploaded municipal documents, classifies them, validates their contents, routes them to the appropriate department, generates follow-up tasks, and visualizes the complete workflow through an interactive dashboard.

## Problem Statement

Municipal governments process thousands of applications every day, including residency registrations, tax assessments, utility requests, permits, and business licenses. These processes often require manual review, inter-department communication, and repetitive administrative work, leading to delays and increased workload.

City-Agent addresses this challenge by acting as an autonomous municipal workforce that assists government departments in processing citizen requests efficiently.

## Key Features

* Automated municipal document classification
* Intelligent department routing
* Multi-department workflow coordination
* Municipal case queue management
* Task generation and tracking
* Workforce analytics dashboard
* Workflow visualization
* Citizen journey tracking

## Supported Municipal Forms

* Residency Certificate
* Property Tax Assessment
* Water Connection Application
* Building Permit Application
* Business License Renewal

## Workflow

Citizen Upload → Document Analysis → Validation → Department Routing → Task Generation → Department Coordination → Case Management Dashboard

## Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* FastAPI
* Python

## Impact

City-Agent demonstrates how AI agents can support municipal governments by:

* Reducing manual administrative effort
* Improving inter-department coordination
* Accelerating citizen service delivery
* Increasing operational efficiency
* Supporting workforce shortages in aging societies

## Running the Project

### Backend

```bash
cd backend
.\venv\Scripts\activate
python -m uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Future Enhancements

* OCR-based document extraction
* Real-time department notifications
* Citizen portal integration
* Advanced AI workflow planning
* Municipal analytics and forecasting

Built for the FAR AWAY Hackathon.

