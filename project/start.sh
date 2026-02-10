#!/bin/bash

# Expense OCR Tracker - Start Script
# This script starts both the Django backend and Angular frontend

echo "Starting Expense OCR Tracker..."
echo "================================"

# Check if we're in the project root
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "Error: Please run this script from the project root directory"
    exit 1
fi

# Start Django backend in the background
echo "Starting Django backend on http://localhost:8000..."
cd backend
python manage.py runserver > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait a moment for the backend to start
sleep 3

# Start Angular frontend
echo "Starting Angular frontend on http://localhost:4200..."
cd frontend
npm start

# When frontend is stopped, also stop the backend
echo "Shutting down servers..."
kill $BACKEND_PID
echo "Servers stopped."
