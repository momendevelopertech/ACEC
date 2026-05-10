@echo off
setlocal enabledelayedexpansion

:: ============================================
::  ACEC — Stop Local Servers
:: ============================================

echo [INFO] Stopping ACEC local servers...

:: 1. Stop Laravel (php artisan serve)
echo [INFO] Stopping PHP Artisan Server...
taskkill /f /im php.exe 2>nul
if errorlevel 1 (
    echo [INFO] No PHP processes found.
) else (
    echo [SUCCESS] PHP server stopped.
)

:: 2. Stop Node.js processes related to this project (Next.js)
echo [INFO] Stopping Node.js (Next.js)...
taskkill /f /im node.exe 2>nul
if errorlevel 1 (
    echo [INFO] No Node.js processes found.
) else (
    echo [SUCCESS] Node.js processes stopped.
)

:: 3. Force kill any lingering processes on common ports
echo [INFO] Checking port 3000 (Frontend)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000 " ^| findstr LISTEN') do (
    taskkill /f /pid %%a 2>nul
)
echo [INFO] Checking port 8000 (Backend)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8000 " ^| findstr LISTEN') do (
    taskkill /f /pid %%a 2>nul
)

echo [SUCCESS] All ACEC servers stopped.
pause
