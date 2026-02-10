@echo off
REM Expense OCR Tracker - Start Script for Windows
REM This script starts both the Django backend and Angular frontend

echo Starting Expense OCR Tracker...
echo ================================

REM Check if we're in the project root
if not exist "backend" (
    echo Error: backend directory not found
    exit /b 1
)
if not exist "frontend" (
    echo Error: frontend directory not found
    exit /b 1
)

REM Start Django backend in a new window
echo Starting Django backend on http://localhost:8000...
start "Django Backend" cmd /k "cd backend && python manage.py runserver"

REM Wait a moment for the backend to start
timeout /t 3 /nobreak > nul

REM Start Angular frontend in a new window
echo Starting Angular frontend on http://localhost:4200...
start "Angular Frontend" cmd /k "cd frontend && npm start"

echo Both servers are starting in separate windows...
echo Close those windows to stop the servers.
pause
