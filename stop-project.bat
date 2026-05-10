@echo off
setlocal enabledelayedexpansion

:: ============================================
::  ACEC — Stop Local Servers
::  Kills only processes started by this project
:: ============================================

echo [INFO] Stopping ACEC local servers...
echo.

:: -------------------------------------------------
::  1. Close server windows by their unique title
:: -------------------------------------------------
echo [INFO] Closing server windows...
taskkill /f /fi "WINDOWTITLE eq ACEC-BACKEND-*" >nul 2>&1
taskkill /f /fi "WINDOWTITLE eq ACEC-FRONTEND-*" >nul 2>&1
echo [INFO] Server window close signal sent.
echo.

:: -------------------------------------------------
::  2. Kill PHP processes holding port 8000
:: -------------------------------------------------
echo [INFO] Stopping PHP / Laravel (port 8000)...
for /f "tokens=5" %%a in ('
    netstat -ano ^| findstr /R ":8000" ^| findstr /R "LISTENING"
') do (
    taskkill /f /pid %%a >nul 2>&1
)
echo [SUCCESS] PHP / Laravel stopped.
echo.

:: -------------------------------------------------
::  3. Kill Node processes holding port 3000
:: -------------------------------------------------
echo [INFO] Stopping Node.js / Next.js (port 3000)...
for /f "tokens=5" %%b in ('
    netstat -ano ^| findstr /R ":3000" ^| findstr /R "LISTENING"
') do (
    taskkill /f /pid %%b >nul 2>&1
)
echo [SUCCESS] Node.js / Next.js stopped.
echo.

echo [SUCCESS] All ACEC servers stopped.
echo.
pause
