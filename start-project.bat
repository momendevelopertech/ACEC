@echo off
setlocal enabledelayedexpansion

:: ============================================
::  ACEC — One-Click Local Run Script
::  Windows CMD — Robust path-safe launcher
:: ============================================

set "ROOT_DIR=%~dp0"
:: Strip trailing backslash so we can build paths cleanly
if "!ROOT_DIR:~-1!"=="\" set "ROOT_DIR=!ROOT_DIR:~0,-1!"
set "BACKEND_DIR=!ROOT_DIR!\backend"

:: ===================== BACKEND SETUP =====================
cd /d "!BACKEND_DIR!" 2>nul
if errorlevel 1 (
    echo [ERROR] Backend directory not found: !BACKEND_DIR!
    echo [ERROR] Make sure this script is placed in the project root.
    pause
    exit /b 1
)

echo [INFO] Checking backend setup...
echo.

:: 1. Copy .env if missing
if not exist ".env" (
    echo [INFO] .env not found — creating from .env.example...
    copy ".env.example" ".env" >nul
    if errorlevel 1 (
        echo [ERROR] Failed to create .env from .env.example
        pause
        exit /b 1
    )
    echo [SUCCESS] .env created
) else (
    echo [INFO] .env found
)

:: 2. Install Composer dependencies if vendor missing
if not exist "vendor\autoload.php" (
    echo [INFO] Running composer install...
    call composer install --no-interaction --prefer-dist
    if errorlevel 1 (
        echo [ERROR] composer install failed — is PHP / Composer installed?
        pause
        exit /b 1
    )
    echo [SUCCESS] Composer dependencies installed
) else (
    echo [INFO] vendor found
)

:: 3. Generate APP_KEY if not set
php artisan key:generate --force >nul 2>&1
echo [INFO] APP_KEY checked

:: 4. Run database migrations
echo [INFO] Running database migrations...
php artisan migrate --force
if errorlevel 1 (
    echo [WARN] Migrations failed — check your database connection in backend\.env
) else (
    echo [SUCCESS] Migrations applied
)

echo.

:: ===================== FRONTEND SETUP =====================
cd /d "!ROOT_DIR!" 2>nul

echo [INFO] Checking frontend setup...
echo.

:: 1. Install npm dependencies if node_modules missing
if not exist "node_modules" (
    echo [INFO] Running npm install...
    call npm install
    if errorlevel 1 (
        echo [ERROR] npm install failed — is Node.js installed?
        pause
        exit /b 1
    )
    echo [SUCCESS] npm dependencies installed
) else (
    echo [INFO] node_modules found
)

echo.

:: ===================== LAUNCH SERVERS =====================
echo [INFO] Starting servers in separate windows...
echo.

:: GUIDs / unique markers so taskkill can target only our processes
set "BACKEND_MARKER=ACEC-BACKEND-58A2"
set "FRONTEND_MARKER=ACEC-FRONTEND-7C4B"

:: Start Backend — use cmd /s /c with "" for inner quotes
:: This pattern is the ONLY reliable way to pass quoted paths through cmd /c in Windows
start "%BACKEND_MARKER%" cmd /s /c "cd /d ""!BACKEND_DIR!"" && title ACEC — Backend && php artisan serve --host=127.0.0.1 --port=8000"

:: Brief pause so the backend can begin initializing
timeout /t 3 /nobreak >nul

:: Start Frontend
start "%FRONTEND_MARKER%" cmd /s /c "cd /d ""!ROOT_DIR!"" && title ACEC — Frontend && npm run dev"

:: Wait briefly, then open browser
timeout /t 5 /nobreak >nul

echo [SUCCESS] Opening browser at http://localhost:3000
start "" http://localhost:3000

echo.
echo [INFO] Close this window or use stop-project.bat to stop all servers.
echo.
pause
