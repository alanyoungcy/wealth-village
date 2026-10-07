#!/bin/bash

# Virtual Wealth Management Startup Script

echo "🚀 Starting Virtual Wealth Management Dashboard..."
echo ""

# Check if we're in the right directory
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo "❌ Error: Please run this script from the virtualwealth directory"
    exit 1
fi

# Start backend in background
echo "📡 Starting Backend API..."
cd backend
uv run python main.py &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo "⏳ Waiting for backend to initialize..."
sleep 3

# Start frontend
echo "🎨 Starting Frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Services started!"
echo ""
echo "📊 Backend API: http://localhost:8000"
echo "🌐 Frontend UI: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Services stopped"
    exit 0
}

# Trap Ctrl+C and cleanup
trap cleanup INT TERM

# Wait for processes
wait
