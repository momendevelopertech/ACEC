@echo off
setlocal enabledelayedexpansion

:: ============================================================================
::  ACEC — One-Click Local Run Script
::  Windows CMD — Production-grade launcher
::  Tested on Windows 10 / 11 with Laragon
:: ============================================================================

:: ---------- path setup ----------
:: %~dp0 gives drive + path of THIS script, always ends with "\"
:: We strip the trailing "\" so path concatenation is clean everywhere.
:: Delayed expansion (!VAR!) is used inside if-blocks where variables
:: are both read and written.
set "ROOT_DIR=%~dp0"
if "!ROOT_DIR:~-1!"=="\" set "ROOT_DIR=!ROOT_DIR:~0,-1!"
set "BACKEND_DIR=!ROOT_DIR!\backend"
set "ARTISAN=!BACKEND_DIR!\artisan"

:: ---------- ANSI colour codes (optional, works on Win10+) ----------
set "C_INFO=[INFO]"
set "C_OK=[SUCCESS]"
set "C_WARN=[WARN]"
set "C_ERR=[ERROR]"

:: ====================================================================
::  PHASE 0 — Pre-flight tool checks
:: ====================================================================
echo.
echo ===== ACEC Local Runner =====
echo.
echo %C_INFO% Checking required tools...
echo.

:: PHP
where php >nul 2>&1
if errorlevel 1 (
    echo %C_ERR% PHP is not found in PATH.
    echo %C_ERR% Install PHP 8.3+ via Laragon or https://windows.php.net
    pause
    exit /b 1
)
for /f "tokens=2 delims= " %%v in ('php -v 2^>nul ^| findstr /R "^PHP"') do (
    echo %C_INFO% PHP found: %%v
    goto :php_checked
)
:php_checked

:: Composer
where composer >nul 2>&1
if errorlevel 1 (
    echo %C_ERR% Composer is not found in PATH.
    echo %C_ERR% Install Composer from https://getcomposer.org
    pause
    exit /b 1
)
echo %C_INFO% Composer found

:: Node.js
where node >nul 2>&1
if errorlevel 1 (
    echo %C_ERR% Node.js is not found in PATH.
    echo %C_ERR% Install Node.js 18+ from https://nodejs.org
    pause
    exit /b 1
)
for /f "tokens=1 delims=v" %%v in ('node -v 2^>nul') do echo %C_INFO% Node.js found: %%v

:: npm
where npm >nul 2>&1
if errorlevel 1 (
    echo %C_ERR% npm is not found in PATH.
    echo %C_ERR% npm ships with Node.js — check your installation.
    pause
    exit /b 1
)
echo %C_INFO% npm found

echo.
echo %C_OK% All required tools available.
echo.

:: ====================================================================
::  PHASE 1 — Backend setup
:: ====================================================================
echo ===== Backend Setup =====
echo.

:: Verify the backend directory and artisan exist
if not exist "!ARTISAN!" (
    echo %C_ERR% Backend artisan file not found at:
    echo %C_ERR%   !ARTISAN!
    echo %C_ERR% Ensure this script is in the project root alongside the backend/ folder.
    pause
    exit /b 1
)

cd /d "!BACKEND_DIR!" || (
    echo %C_ERR% Cannot change to backend directory: !BACKEND_DIR!
    pause
    exit /b 1
)

:: 1 — Create .env from example if missing
if not exist ".env" (
    echo %C_INFO% .env not found — copying from .env.example...
    copy ".env.example" ".env" >nul
    if errorlevel 1 (
        echo %C_ERR% Failed to copy .env.example to .env
        echo %C_ERR% Check file permissions on: !BACKEND_DIR!\.env.example
        pause
        exit /b 1
    )
    echo %C_OK% .env created
) else (
    echo %C_INFO% .env found — using existing configuration
)

:: 2 — Composer install
if not exist "vendor\autoload.php" (
    echo %C_INFO% vendor\autoload.php not found — running composer install...
    echo.
    call composer install --no-interaction --prefer-dist
    if errorlevel 1 (
        echo.
        echo %C_ERR% composer install failed.
        echo %C_ERR% Possible causes:
        echo %C_ERR%   - No internet connection
        echo %C_ERR%   - composer.json error
        echo %C_ERR%   - PHP extension missing (check php -m)
        echo %C_ERR%   - Out of memory (try: php -d memory_limit=-1 composer install)
        pause
        exit /b 1
    )
    echo.
    echo %C_OK% Composer dependencies installed
) else (
    echo %C_INFO% vendor found — dependencies already installed
)

:: 3 — APP_KEY
echo %C_INFO% Ensuring APP_KEY is set...
php artisan key:generate --force >nul 2>&1
if errorlevel 1 (
    echo %C_WARN% Could not generate APP_KEY — check backend\.env permissions
) else (
    echo %C_INFO% APP_KEY ready
)

:: 4 — Database migrations
echo %C_INFO% Running database migrations...
php artisan migrate --force
if errorlevel 1 (
    echo %C_WARN% Database migrations failed.
    echo %C_WARN% The backend server will still start, but some features may not work.
    echo %C_WARN% Check your MySQL connection in: !BACKEND_DIR!\.env
    echo %C_WARN%   DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD
) else (
    echo %C_OK% Migrations applied
)

echo.
echo %C_OK% Backend setup complete.
echo.

:: ====================================================================
::  PHASE 2 — Frontend setup
:: ====================================================================
echo ===== Frontend Setup =====
echo.

cd /d "!ROOT_DIR!" || (
    echo %C_ERR% Cannot change to project root: !ROOT_DIR!
    pause
    exit /b 1
)

:: 1 — npm install
if not exist "node_modules" (
    echo %C_INFO% node_modules not found — running npm install...
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo %C_ERR% npm install failed.
        echo %C_ERR% Possible causes:
        echo %C_ERR%   - No internet connection
        echo %C_ERR%   - package.json error
        echo %C_ERR%   - Outdated npm version (try: npm install -g npm@latest)
        echo %C_ERR%   - Try deleting package-lock.json and node_modules, then retry
        pause
        exit /b 1
    )
    echo.
    echo %C_OK% npm dependencies installed
) else (
    echo %C_INFO% node_modules found — dependencies already installed
)

echo.
echo %C_OK% Frontend setup complete.
echo.

:: ====================================================================
::  PHASE 3 — Port availability check
:: ====================================================================
echo ===== Port Check =====
echo.

set "PORT_CONFLICT=0"

netstat -ano 2>nul | findstr /R ":8000" | findstr /R "LISTENING" >nul 2>&1
if not errorlevel 1 (
    echo %C_WARN% Port 8000 is already in use. Another PHP/Laravel process may be running.
    echo %C_WARN% Run stop-project.bat first, or close the other process.
    set "PORT_CONFLICT=1"
) else (
    echo %C_INFO% Port 8000 — available
)

netstat -ano 2>nul | findstr /R ":3000" | findstr /R "LISTENING" >nul 2>&1
if not errorlevel 1 (
    echo %C_WARN% Port 3000 is already in use. Another Node.js/Next.js process may be running.
    echo %C_WARN% Run stop-project.bat first, or close the other process.
    set "PORT_CONFLICT=1"
) else (
    echo %C_INFO% Port 3000 — available
)

echo.
if "!PORT_CONFLICT!"=="1" (
    echo %C_ERR% Port conflict detected. Please run stop-project.bat and try again.
    pause
    exit /b 1
)

:: ====================================================================
::  PHASE 4 — Launch servers in separate windows
:: ====================================================================
echo ===== Launching Servers =====
echo.

:: -----------------------------------------------------------------------
::  Window-title markers
::  The title passed to start() is visible only for a split second before
::  cmd runs.  We therefore also call title INSIDE the cmd /s /c string
::  with the SAME unique ID so the window keeps a targetable name.
::  This lets stop-project.bat use taskkill /fi "WINDOWTITLE eq ..." to
::  close ONLY our server windows — never unrelated PHP/Node processes.
:: -----------------------------------------------------------------------
set "BACKEND_WIN=ACEC-Backend-58A2"
set "FRONTEND_WIN=ACEC-Frontend-7C4B"

:: -----------------------------------------------------------------------
::  Windows CMD nested-quote rule
::  When passing a command string to cmd /s /c, the outermost " are
::  stripped by /s.  Inside the string, "" becomes a literal ".
::  This is the ONLY portable way to protect paths containing spaces
::  when they appear inside a cmd /c argument — backslash escaping (\")
::  does NOT work in CMD (it is a Unix convention).
:: -----------------------------------------------------------------------

:: Start Laravel backend
echo %C_INFO% Starting Laravel backend at http://127.0.0.1:8000
start "!BACKEND_WIN!" cmd /s /c "cd /d ""!BACKEND_DIR!"" && title !BACKEND_WIN! && php artisan serve --host=127.0.0.1 --port=8000"

echo %C_INFO% Waiting for backend to initialize...
timeout /t 3 /nobreak >nul

:: Start Next.js frontend
echo %C_INFO% Starting Next.js frontend at http://localhost:3000
start "!FRONTEND_WIN!" cmd /s /c "cd /d ""!ROOT_DIR!"" && title !FRONTEND_WIN! && npm run dev"

echo %C_INFO% Waiting for frontend to initialize...
timeout /t 5 /nobreak >nul

:: Open browser
echo %C_OK% Opening browser...
start "" http://localhost:3000

echo.
echo ===== ACEC is running =====
echo.
echo   Frontend : http://localhost:3000
echo   Backend  : http://127.0.0.1:8000
echo   Dashboard: http://127.0.0.1:8000/admin
echo.
echo   To stop: double-click stop-project.bat
echo.
pause
