@echo off
setlocal enabledelayedexpansion

:: ============================================
::  ACEC — One-Click Local Run Script
:: ============================================

set "ROOT_DIR=%~dp0"
set "BACKEND_DIR=%ROOT_DIR%backend"

:: -------------------------------------------------
::  Start Backend in a new CMD window
:: -------------------------------------------------
start "ACEC — Backend" cmd /c "
    cd /d \"%BACKEND_DIR%\"
    echo [INFO] Checking backend setup...

    :: 1. Copy .env if missing
    if not exist \".env\" (
        echo [INFO] .env not found — copying from .env.example...
        copy \".env.example\" \".env\" >nul
        if errorlevel 1 (
            echo [ERROR] Failed to copy .env.example — check permissions.
            pause & exit /b 1
        )
        echo [SUCCESS] .env created from .env.example
    ) else (
        echo [INFO] .env found
    )

    :: 2. Install Composer dependencies if vendor missing
    if not exist \"vendor\artisan\" (
        echo [INFO] vendor not found — running composer install...
        call composer install --no-interaction --prefer-dist
        if errorlevel 1 (
            echo [ERROR] composer install failed — check PHP / Composer setup.
            pause & exit /b 1
        )
        echo [SUCCESS] Composer dependencies installed
    ) else (
        echo [INFO] vendor found
    )

    :: 3. Generate APP_KEY if not set
    php -r \"echo env('APP_KEY', '');\" 2>nul | findstr /r \".\" >nul
    if errorlevel 1 (
        echo [INFO] APP_KEY is empty — generating key...
        call php artisan key:generate --force
        if errorlevel 1 (
            echo [ERROR] Failed to generate APP_KEY.
            pause & exit /b 1
        )
        echo [SUCCESS] APP_KEY generated
    ) else (
        echo [INFO] APP_KEY found
    )

    :: 4. Run migrations
    echo [INFO] Running database migrations...
    call php artisan migrate --force
    if errorlevel 1 (
        echo [WARN] Migrations failed — check DB connection in .env
    ) else (
        echo [SUCCESS] Migrations applied
    )

    :: 5. Start Laravel dev server
    echo [SUCCESS] Backend ready — starting server at http://127.0.0.1:8000
    call php artisan serve --host=127.0.0.1 --port=8000
    if errorlevel 1 (
        echo [ERROR] Failed to start PHP server — port 8000 may be in use.
        pause
    )
"

:: Brief pause to let backend start initializing
timeout /t 3 /nobreak >nul

:: -------------------------------------------------
::  Start Frontend in a new CMD window
:: -------------------------------------------------
start "ACEC — Frontend" cmd /c "
    cd /d \"%ROOT_DIR%\"
    echo [INFO] Checking frontend setup...

    :: 1. Install npm dependencies if node_modules missing
    if not exist \"node_modules\\.package-lock.json\" (
        echo [INFO] node_modules not found — running npm install...
        call npm install
        if errorlevel 1 (
            echo [ERROR] npm install failed — check Node.js setup.
            pause & exit /b 1
        )
        echo [SUCCESS] npm dependencies installed
    ) else (
        echo [INFO] node_modules found
    )

    :: 2. Start Next.js dev server
    echo [SUCCESS] Frontend ready — starting dev server at http://localhost:3000
    call npm run dev
    if errorlevel 1 (
        echo [ERROR] Failed to start Next.js — port 3000 may be in use.
        pause
    )
"

:: Wait for servers to start, then open browser
timeout /t 6 /nobreak >nul
echo [SUCCESS] Opening browser at http://localhost:3000
start "" http://localhost:3000
echo [INFO] Both servers should be starting up.
echo [INFO] Close this window or use stop-project.bat to stop all servers.
pause
