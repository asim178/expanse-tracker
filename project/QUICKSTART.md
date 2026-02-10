# Quick Start Guide

## Option 1: Docker (Easiest & Recommended)

The fastest way to run the application is with Docker. Everything is set up automatically.

### Prerequisites
- Docker Desktop installed and running

### Run the Application

```bash
# Navigate to project directory
cd expense-tracker-project

# Start everything (PostgreSQL, Backend, Frontend)
docker-compose up
```

That's it! Wait 3-5 minutes for first-time setup, then access:
- **Frontend**: http://localhost:4200
- **Backend**: http://localhost:8000

### Stop the Application

```bash
docker-compose down
```

For detailed Docker instructions, see [DOCKER.md](DOCKER.md)

---

## Option 2: Manual Setup

If you prefer not to use Docker, follow these steps:

## First Time Setup

### 1. Install PostgreSQL

Install PostgreSQL on your system:

**Ubuntu/Debian:**
```bash
sudo apt update && sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**macOS (Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Windows:** Download from [postgresql.org](https://www.postgresql.org/download/)

### 2. Create Database

```bash
sudo -u postgres psql
CREATE DATABASE expense_tracker;
CREATE USER your_username WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE expense_tracker TO your_username;
\q
```

### 3. Configure Database

Edit `backend/.env` with your PostgreSQL credentials:

```env
DB_NAME=expense_tracker
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

### 4. Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
cd ..
```

### 5. Run Database Migrations

```bash
cd backend
python manage.py migrate
cd ..
```

### 6. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

## Running the Application

### Option 1: Use the Start Script (Recommended)

**On macOS/Linux:**
```bash
./start.sh
```

**On Windows:**
```
start.bat
```

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
python manage.py runserver
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## Access the Application

Once both servers are running:

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:8000/api/expenses/records/
- **Django Admin**: http://localhost:8000/admin/

## Using the Application

1. Open http://localhost:4200 in your browser
2. Click "Select Image" button
3. Choose an image of your handwritten expense notebook
4. Wait for OCR processing (you'll see a "Processing..." message)
5. View the detected amounts and total
6. All records are automatically saved to the database
7. Scroll down to see your expense history

## Troubleshooting

### Backend Issues

**Database Connection Error:**
- Verify your database credentials in `backend/.env`
- Make sure PostgreSQL is running: `sudo systemctl status postgresql` (Linux) or `brew services list` (macOS)
- Check that the database exists: `psql -U postgres -c "\l"`
- Verify the database user has proper permissions

**Port 8000 Already in Use:**
```bash
# Find and kill the process using port 8000
lsof -ti:8000 | xargs kill -9
```

### Frontend Issues

**Port 4200 Already in Use:**
```bash
# Find and kill the process using port 4200
lsof -ti:4200 | xargs kill -9
```

**Build Errors:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### OCR Not Working

- Make sure you're uploading a clear image
- Check browser console for errors (F12)
- Try a different image with clearer handwriting
- Ensure internet connection (Tesseract.js downloads language files)

## Development Tips

- Backend automatically reloads when you change Python files
- Frontend automatically reloads when you change TypeScript/HTML/CSS files
- Check backend logs in the terminal for API errors
- Check browser console (F12) for frontend errors
- Use Django Admin to view database records directly

## Need Help?

See the full [README.md](README.md) for detailed documentation.
