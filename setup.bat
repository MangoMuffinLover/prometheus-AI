@echo off
echo.
echo ========================================
echo    CIRCULA AI ASSISTANT SETUP
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo.
    echo Recommended version: Node.js 16.0 or higher
    echo.
    echo After installation:
    echo 1. Restart this command prompt
    echo 2. Run this setup script again
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node --version

REM Check if npm is available
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not available
    echo Please reinstall Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] npm is available
npm --version
echo.

echo Installing dependencies...
echo.
npm install

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Failed to install dependencies
    echo Please check your internet connection and try again
    pause
    exit /b 1
)

echo.
echo ========================================
echo    SETUP COMPLETE!
echo ========================================
echo.
echo To start the Circula AI Assistant:
echo.
echo   npm start
echo.
echo The application will open in your browser at:
echo   http://localhost:3000
echo.
echo Make sure to allow camera and microphone permissions
echo when prompted for full functionality.
echo.
echo For demo mode, the demo panel will appear automatically
echo in the top-right corner of the application.
echo.
pause