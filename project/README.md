# Expense OCR Tracker

A web application for finance users to upload images of handwritten expense notebooks, extract amounts using OCR, and automatically calculate totals.

> **🚀 Quick Start**: Run `docker-compose up` and everything (PostgreSQL, Backend, Frontend) will be set up automatically! See [Quick Start with Docker](#quick-start-with-docker-recommended) below.

## Architecture

This project is structured with separate backend and frontend applications:

- **Backend**: Django + Django REST Framework + PostgreSQL
- **Frontend**: Angular + Tesseract.js (OCR)
- **Database**: PostgreSQL

## Features

- Upload or capture images of handwritten expense notebooks
- OCR-based text extraction using Tesseract.js
- Automatic number detection and calculation
- Expense history tracking
- Clean, modern UI with real-time results

## Quick Start with Docker (Recommended)

The easiest way to run the application is using Docker. This will automatically set up PostgreSQL, backend, and frontend with all dependencies.

### Prerequisites
- Docker
- Docker Compose

### Run the Application

```bash
# Clone or navigate to the project directory
cd project

# Start all services (PostgreSQL, Backend, Frontend)
docker-compose up

# Or run in detached mode
docker-compose up -d
```

That's it! The application will be available at:
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:8000/api/expenses/records/
- **PostgreSQL**: localhost:5432

### Stop the Application

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (deletes database data)
docker-compose down -v
```

### Rebuild After Changes

```bash
# Rebuild and restart all services
docker-compose up --build
```

## Project Structure

```
project/
├── backend/                 # Django REST API
│   ├── expense_tracker/     # Main Django project
│   ├── expenses/            # Expenses app with models and API
│   │   └── migrations/      # Database migrations
│   ├── requirements.txt     # Python dependencies
│   ├── manage.py           # Django management script
│   ├── Dockerfile          # Backend Docker configuration
│   └── .env                # Environment variables
├── frontend/               # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/ # UI components
│   │   │   ├── services/   # API and OCR services
│   │   │   └── app.ts      # Main app component
│   │   └── index.html
│   ├── package.json
│   └── Dockerfile          # Frontend Docker configuration
├── docker-compose.yml      # Docker orchestration (PostgreSQL, Backend, Frontend)
├── start.sh                # Manual start script for Linux/macOS
├── start.bat               # Manual start script for Windows
└── README.md               # This file
```

## Prerequisites

### Option 1: Docker (Recommended)
- Docker
- Docker Compose

### Option 2: Manual Setup
- Python 3.8+
- Node.js 18+
- PostgreSQL 12+ (local or hosted)

## Manual Setup (Without Docker)

If you prefer not to use Docker, follow these steps:

## Backend Setup

### 1. Install PostgreSQL

Make sure you have PostgreSQL installed and running:

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**macOS (using Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Windows:**
Download and install from [postgresql.org](https://www.postgresql.org/download/windows/)

### 2. Create Database

Create a new database for the application:

```bash
sudo -u postgres psql
CREATE DATABASE expense_tracker;
CREATE USER your_username WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE expense_tracker TO your_username;
\q
```

### 3. Configure Database Connection

Update `backend/.env` with your PostgreSQL credentials:

```env
DB_NAME=expense_tracker
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

### 4. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 5. Run Migrations

Create the database tables:

```bash
python manage.py migrate
```

### 6. (Optional) Create Admin User

To access Django admin panel:

```bash
python manage.py createsuperuser
```

### 7. Start the Django Server

```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start the Development Server

```bash
npm start
```

The frontend will be available at `http://localhost:4200`

## API Endpoints

### Base URL: `http://localhost:8000/api/expenses/`

- **GET /records/** - List all expense records (last 10)
- **POST /records/** - Create a new expense record
- **GET /records/{id}/** - Get a specific expense record
- **PUT /records/{id}/** - Update an expense record
- **DELETE /records/{id}/** - Delete an expense record

### Example Request

```bash
curl -X POST http://localhost:8000/api/expenses/records/ \
  -H "Content-Type: application/json" \
  -d '{
    "extracted_text": "Groceries 45.50\nGas 30.00",
    "detected_amounts": [45.50, 30.00],
    "total_amount": 75.50,
    "notes": ""
  }'
```

## Usage

1. Start both the backend and frontend servers
2. Open your browser to `http://localhost:4200`
3. Click "Select Image" to upload an expense notebook photo
4. The app will automatically:
   - Extract text using OCR
   - Detect all numeric amounts
   - Calculate the total
   - Save the record to the database
   - Display results and update history

## Database Schema

### expense_records table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| extracted_text | TEXT | Full OCR extracted text |
| detected_amounts | JSONB | Array of detected numbers |
| total_amount | DECIMAL(10,2) | Sum of all amounts |
| notes | TEXT | Optional user notes |
| created_at | TIMESTAMP | Record creation time |

## Technologies

### Backend
- Django 6.0
- Django REST Framework 3.14
- django-cors-headers 4.3
- psycopg2 2.9 (PostgreSQL adapter)
- python-decouple 3.8

### Frontend
- Angular 21
- Tesseract.js 5.0 (OCR)
- TypeScript
- RxJS

### Database
- PostgreSQL 12+

## Development Notes

- The backend uses Django's built-in development server
- CORS is enabled for development (all origins allowed)
- The frontend makes HTTP requests to the Django backend
- OCR processing happens client-side in the browser
- Database uses standard PostgreSQL connection

## Production Considerations

Before deploying to production:

1. Update Django's `SECRET_KEY` in `.env`
2. Set `DEBUG=False` in backend settings
3. Configure proper CORS origins (not `CORS_ALLOW_ALL_ORIGINS`)
4. Use a production-grade web server (Gunicorn, uWSGI)
5. Serve frontend with a production build
6. Enable HTTPS
7. Add proper error handling and logging
8. Implement authentication if needed
9. Add rate limiting to API endpoints
10. Use environment variables for sensitive data
