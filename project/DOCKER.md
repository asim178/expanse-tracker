# Docker Quick Start

This guide will help you run the Expense OCR Tracker application using Docker in just one command.

## What Gets Installed Automatically

When you run `docker-compose up`, Docker will automatically:

1. **Download and install PostgreSQL 15** (database)
2. **Install all Python dependencies** (Django, REST Framework, etc.)
3. **Install all Node.js dependencies** (Angular, Tesseract.js, etc.)
4. **Create the database** with all required tables
5. **Start all three services**:
   - PostgreSQL on port 5432
   - Django backend on port 8000
   - Angular frontend on port 4200

## Prerequisites

You only need two things installed on your machine:

- **Docker Desktop** (includes Docker and Docker Compose)
  - [Download for Windows](https://www.docker.com/products/docker-desktop/)
  - [Download for Mac](https://www.docker.com/products/docker-desktop/)
  - [Install on Linux](https://docs.docker.com/engine/install/)

## Installation Steps

### Step 1: Install Docker Desktop

Download and install Docker Desktop for your operating system from the links above.

### Step 2: Start Docker Desktop

Make sure Docker Desktop is running before proceeding.

### Step 3: Navigate to Project Directory

```bash
cd /path/to/expense-tracker-project
```

### Step 4: Start the Application

```bash
docker-compose up
```

That's it! Docker will:
- Download all required images
- Install all dependencies
- Set up the database
- Start all services

**First time setup takes 3-5 minutes.** Subsequent starts take only seconds.

## Accessing the Application

Once you see these messages in the terminal:
```
expense_tracker_backend   | Starting Django server...
expense_tracker_frontend  | ✔ Browser application bundle generation complete.
```

The application is ready:

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:8000/api/expenses/records/
- **Django Admin**: http://localhost:8000/admin/

## Common Commands

### Start in Background (Detached Mode)
```bash
docker-compose up -d
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

### Stop the Application
```bash
docker-compose down
```

### Stop and Delete All Data
```bash
docker-compose down -v
```
⚠️ This will delete the database and all expense records!

### Restart After Code Changes
```bash
docker-compose restart backend
# or
docker-compose restart frontend
```

### Rebuild Everything
```bash
docker-compose up --build
```

### Access Backend Shell
```bash
docker-compose exec backend python manage.py shell
```

### Access Database
```bash
docker-compose exec db psql -U postgres -d expense_tracker
```

### Create Django Admin User
```bash
docker-compose exec backend python manage.py createsuperuser
```

## Troubleshooting

### Port Already in Use

If you get an error that port 8000, 4200, or 5432 is already in use:

**Option 1: Stop the conflicting service**
```bash
# Find process using port
lsof -ti:8000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :8000   # Windows

# Then retry
docker-compose up
```

**Option 2: Change ports in docker-compose.yml**
```yaml
# Example: Change frontend port from 4200 to 4201
frontend:
  ports:
    - "4201:4200"  # Change left number only
```

### Permission Denied

On Linux, if you get permission errors:
```bash
sudo docker-compose up
# or add your user to docker group
sudo usermod -aG docker $USER
# Then log out and back in
```

### Docker Not Running

Error: "Cannot connect to the Docker daemon"

**Solution**: Start Docker Desktop application

### Slow Performance on Windows

If the app is slow on Windows:

**Solution**: Make sure you're using WSL 2 backend in Docker Desktop settings

### Frontend Not Loading

If frontend shows empty page:

1. Check browser console (F12) for errors
2. Verify backend is running: `curl http://localhost:8000/api/expenses/records/`
3. Restart frontend: `docker-compose restart frontend`

### Database Connection Error

If backend can't connect to database:

1. Wait 10-15 seconds after starting (database needs time to initialize)
2. Check database is healthy: `docker-compose ps`
3. Restart backend: `docker-compose restart backend`

## Understanding docker-compose.yml

The `docker-compose.yml` file defines three services:

### 1. Database (db)
```yaml
db:
  image: postgres:15-alpine
  environment:
    POSTGRES_DB: expense_tracker
    POSTGRES_USER: postgres
    POSTGRES_PASSWORD: postgres123
```
- Uses official PostgreSQL 15 image
- Creates database automatically
- Data persists in Docker volume

### 2. Backend (backend)
```yaml
backend:
  build: ./backend
  ports:
    - "8000:8000"
  depends_on:
    - db
```
- Builds from `backend/Dockerfile`
- Waits for database to be ready
- Runs migrations automatically
- Starts Django development server

### 3. Frontend (frontend)
```yaml
frontend:
  build: ./frontend
  ports:
    - "4200:4200"
  depends_on:
    - backend
```
- Builds from `frontend/Dockerfile`
- Waits for backend to start
- Starts Angular development server
- Hot-reload enabled for development

## Development Workflow

### Making Changes

**Backend changes** (Python files):
- Changes are detected automatically
- Django server reloads
- No restart needed

**Frontend changes** (TypeScript/HTML/CSS):
- Changes are detected automatically
- Angular recompiles
- Browser refreshes automatically

**Dependency changes** (requirements.txt or package.json):
```bash
docker-compose up --build
```

### Database Changes

**Create new migration:**
```bash
docker-compose exec backend python manage.py makemigrations
```

**Apply migrations:**
```bash
docker-compose exec backend python manage.py migrate
```

## Production Deployment

For production, you'll want to:

1. **Use environment variables** for sensitive data
2. **Build production images**:
   ```bash
   docker-compose -f docker-compose.prod.yml build
   ```
3. **Use a reverse proxy** (nginx)
4. **Enable HTTPS**
5. **Use managed database** service
6. **Set DEBUG=False** in Django settings

## Cleaning Up

### Remove all containers
```bash
docker-compose down
```

### Remove containers and volumes
```bash
docker-compose down -v
```

### Remove containers, volumes, and images
```bash
docker-compose down -v --rmi all
```

### Clean Docker system
```bash
docker system prune -a
```

## Next Steps

Once the application is running:

1. Open http://localhost:4200
2. Click "Select Image"
3. Upload a photo of handwritten expenses
4. Watch OCR extract amounts automatically
5. See total calculated instantly
6. View expense history below

Enjoy your automated expense tracking!
