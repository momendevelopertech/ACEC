@echo off
setlocal enabledelayedexpansion

:: ============================================================================
::  ACEC — One-Click Local Run Script
::  Laragon-aware — auto-detects PHP, Composer, Node.js, npm
::  Does NOT rely on Windows system PATH.
:: ============================================================================

set "C_INFO=[INFO]"
set "C_OK=[SUCCESS]"
set "C_WARN=[WARN]"
set "C_ERR=[ERROR]"

:: -------------------------------------------------
::  VERBOSE mode — set VERBOSE=1 to print expanded
::  launch commands before execution
:: -------------------------------------------------
if defined VERBOSE (
    echo %C_INFO% [VERBOSE] mode enabled — expanded launch commands will be shown
    echo.
)

:: ---------- path setup ----------
set "SCRIPT_DIR=%~dp0"
if "!SCRIPT_DIR:~-1!"=="\" set "SCRIPT_DIR=!SCRIPT_DIR:~0,-1!"
set "BACKEND_DIR=!SCRIPT_DIR!\backend"
set "ARTISAN=!BACKEND_DIR!\artisan"

:: ====================================================================
::  PHASE 0 — Auto-detect Laragon installation
:: ====================================================================
echo.
echo ===== ACEC Local Runner =====
echo.
echo %C_INFO% Detecting Laragon...
echo.

set "LARAGON_ROOT="

:: Check common Laragon installation paths
for %%p in ("C:\laragon" "D:\laragon") do (
    if exist "%%~p\bin\php" (
        set "LARAGON_ROOT=%%~p"
        goto :laragon_found
    )
)
:laragon_found

if not defined LARAGON_ROOT (
    echo %C_ERR% Laragon not found at C:\laragon or D:\laragon.
    echo %C_ERR% Install Laragon from https://laragon.org/download/
    echo %C_ERR% or set up PHP, Composer, Node.js manually in your PATH.
    pause
    exit /b 1
)
echo %C_OK% Laragon found at: !LARAGON_ROOT!
echo.

:: -------------------------------------------------
::  Detect PHP — latest version
:: -------------------------------------------------
set "PHP_DIR="
set "PHP_EXE="

for /f "delims=" %%d in ('dir /b /ad /o-n "!LARAGON_ROOT!\bin\php\php-*" 2^>nul') do (
    if exist "!LARAGON_ROOT!\bin\php\%%d\php.exe" (
        set "PHP_DIR=!LARAGON_ROOT!\bin\php\%%d"
        set "PHP_EXE=!PHP_DIR!\php.exe"
        goto :php_found
    )
)
:php_found

if not defined PHP_EXE (
    echo %C_ERR% No PHP installation found in !LARAGON_ROOT!\bin\php\
    echo %C_ERR% Install PHP via Laragon ^> Menu ^> PHP ^> Quick Add.
    pause
    exit /b 1
)
echo %C_INFO% PHP      : !PHP_EXE!
"%PHP_EXE%" -v 2>nul | findstr /R "^PHP" > %TEMP%\acec_pv.tmp
set /p _pv=<%TEMP%\acec_pv.tmp
if defined _pv echo %C_INFO% PHP version: !_pv!
del %TEMP%\acec_pv.tmp 2>nul

:: -------------------------------------------------
::  Detect Composer
:: -------------------------------------------------
set "COMPOSER_PHAR="
set "COMPOSER_CMD="

if exist "!LARAGON_ROOT!\bin\composer\composer.phar" (
    set "COMPOSER_PHAR=!LARAGON_ROOT!\bin\composer\composer.phar"
    echo %C_INFO% Composer : !COMPOSER_PHAR!
) else if exist "!LARAGON_ROOT!\bin\composer\composer.bat" (
    set "COMPOSER_CMD=!LARAGON_ROOT!\bin\composer\composer.bat"
    echo %C_INFO% Composer : !COMPOSER_CMD!
) else (
    echo %C_ERR% Composer not found in !LARAGON_ROOT!\bin\composer\
    echo %C_ERR% Install Composer via Laragon ^> Menu ^> Tools ^> Quick Add.
    pause
    exit /b 1
)

:: -------------------------------------------------
::  Detect Node.js
:: -------------------------------------------------
set "NODE_DIR="
set "NODE_EXE="
set "NPM_CMD="

for /f "delims=" %%d in ('dir /b /ad /o-n "!LARAGON_ROOT!\bin\nodejs\*" 2^>nul') do (
    if exist "!LARAGON_ROOT!\bin\nodejs\%%d\node.exe" (
        set "NODE_DIR=!LARAGON_ROOT!\bin\nodejs\%%d"
        set "NODE_EXE=!NODE_DIR!\node.exe"
        goto :node_found
    )
)
:node_found

if not defined NODE_EXE (
    echo %C_ERR% Node.js not found in !LARAGON_ROOT!\bin\nodejs\
    echo %C_ERR% Install Node.js via Laragon ^> Menu ^> Node.js ^> Quick Add.
    pause
    exit /b 1
)
echo %C_INFO% Node.js  : !NODE_EXE!
"%NODE_EXE%" -v > %TEMP%\acec_nv.tmp 2>nul
set /p _nv=<%TEMP%\acec_nv.tmp
if defined _nv echo %C_INFO% Node version: !_nv!
del %TEMP%\acec_nv.tmp 2>nul

:: Detect npm — co-located with node.exe or in separate bin\npm
if exist "!NODE_DIR!\npm.cmd" (
    set "NPM_CMD=!NODE_DIR!\npm.cmd"
) else if exist "!NODE_DIR!\npm\bin\npm.cmd" (
    set "NPM_CMD=!NODE_DIR!\npm\bin\npm.cmd"
) else if exist "!LARAGON_ROOT!\bin\npm\npm.cmd" (
    set "NPM_CMD=!LARAGON_ROOT!\bin\npm\npm.cmd"
) else (
    echo %C_ERR% npm not found alongside Node.js or in !LARAGON_ROOT!\bin\npm\
    echo %C_ERR% Reinstall Node.js via Laragon to include npm.
    pause
    exit /b 1
)
echo %C_INFO% npm      : !NPM_CMD!

echo.
echo %C_OK% All Laragon tools detected.
echo.

:: ====================================================================
::  PHASE 1 — Backend setup
:: ====================================================================
echo ===== Backend Setup =====
echo.

:: Verify the backend directory and artisan exist
if not exist "!ARTISAN!" (
    echo %C_ERR% Backend artisan not found at:
    echo %C_ERR%   !ARTISAN!
    echo %C_ERR% Run this script from the project root -- next to backend/.
    pause
    exit /b 1
)

cd /d "!BACKEND_DIR!" || (
    echo %C_ERR% Cannot access: !BACKEND_DIR!
    pause
    exit /b 1
)

:: 1 — Create .env from .env.example if missing
if not exist ".env" (
    echo %C_INFO% Creating .env from .env.example...
    copy ".env.example" ".env" >nul
    if errorlevel 1 (
        echo %C_ERR% Failed to copy .env.example
        pause
        exit /b 1
    )
    echo %C_OK% .env created
) else (
    echo %C_INFO% .env found
)

:: 2 — Composer install (if vendor missing)
if not exist "vendor\autoload.php" (
    echo %C_INFO% Installing Composer dependencies...
    echo.
    if defined COMPOSER_PHAR (
        "%PHP_EXE%" "!COMPOSER_PHAR!" install --no-interaction --prefer-dist
    ) else (
        :: composer.bat calls php internally — prepend PHP dir to PATH
        set "PATH=!PHP_DIR!;!PATH!"
        call "!COMPOSER_CMD!" install --no-interaction --prefer-dist
    )
    if errorlevel 1 (
        echo.
        echo %C_ERR% Composer install failed.
        echo %C_ERR%   - Check internet connection
        echo %C_ERR%   - Run: php -d memory_limit=-1 composer install
        pause
        exit /b 1
    )
    echo.
    echo %C_OK% Composer dependencies installed
) else (
    echo %C_INFO% Vendor found — skipping install
)

:: 3 — APP_KEY
echo %C_INFO% Ensuring APP_KEY is set...
"%PHP_EXE%" artisan key:generate --force >nul 2>&1
if errorlevel 1 (
    echo %C_WARN% Could not generate APP_KEY
) else (
    echo %C_INFO% APP_KEY ready
)

:: 4 — Database migrations
echo %C_INFO% Running database migrations...
"%PHP_EXE%" artisan migrate --force
if errorlevel 1 (
    echo %C_WARN% Migrations failed.
    echo %C_WARN% Check DB settings in: !BACKEND_DIR!\.env
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

cd /d "!SCRIPT_DIR!" || (
    echo %C_ERR% Cannot access: !SCRIPT_DIR!
    pause
    exit /b 1
)

:: npm install (if node_modules missing)
if not exist "node_modules" (
    echo %C_INFO% Installing npm dependencies...
    echo.
    :: npm.cmd auto-discovers node.exe in its own directory,
    :: but we prepend NODE_DIR to PATH for any sub-process lookup.
    set "PATH=!NODE_DIR!;!PATH!"
    call "!NPM_CMD!" install
    if errorlevel 1 (
        echo.
        echo %C_ERR% npm install failed.
        echo %C_ERR%   - Check internet connection
        echo %C_ERR%   - Try deleting node_modules and package-lock.json
        pause
        exit /b 1
    )
    echo.
    echo %C_OK% npm dependencies installed
) else (
    echo %C_INFO% node_modules found — skipping install
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
    echo %C_WARN% Port 8000 is already in use.
    echo %C_WARN% Run stop-project.bat first.
    set "PORT_CONFLICT=1"
) else (
    echo %C_INFO% Port 8000: available
)

netstat -ano 2>nul | findstr /R ":3000" | findstr /R "LISTENING" >nul 2>&1
if not errorlevel 1 (
    echo %C_WARN% Port 3000 is already in use.
    echo %C_WARN% Run stop-project.bat first.
    set "PORT_CONFLICT=1"
) else (
    echo %C_INFO% Port 3000: available
)

echo.
if "!PORT_CONFLICT!"=="1" (
    echo %C_ERR% Port conflict detected. Run stop-project.bat and retry.
    pause
    exit /b 1
)

:: ====================================================================
::  PHASE 4 — Launch servers in separate windows
:: ====================================================================
echo ===== Launching Servers =====
echo.

:: Unique titles for targeted kill in stop-project.bat
set "BACKEND_WIN=ACEC-Backend-58A2"
set "FRONTEND_WIN=ACEC-Frontend-7C4B"

:: ------------------------------------------------------------------
::  Multi-line cmd /s /k with ^ continuation:
::    cmd /s /k keeps the window open after the command completes
::      so errors are visible.
::    /s strips the outermost " pair; inside the string, "" becomes ".
::    ^ at end of line escapes the newline — the batch parser joins
::      the lines into one logical line.
::    %%PATH%% is the batch-file escape for a literal %PATH%, so the
::      child CMD expands its own %PATH% at runtime, not the parent's.
::    call ""npm.cmd"" is required because npm.cmd is a batch file
::      and must be invoked with call from another batch context.
:: ------------------------------------------------------------------

:: ---- start backend ----
echo %C_INFO% Starting Laravel backend...
echo %C_INFO%   http://127.0.0.1:8000

if defined VERBOSE (
    echo %C_INFO% [VERBOSE] Backend launch command:
    echo cd /d "!BACKEND_DIR!" ^&^& set PATH=!PHP_DIR!;%%%%PATH%%%% ^&^& title !BACKEND_WIN! ^&^& "!PHP_EXE!" artisan serve --host=127.0.0.1 --port=8000
    echo.
)

start "!BACKEND_WIN!" cmd /s /k ^
"cd /d ""!BACKEND_DIR!"" && ^
set PATH=!PHP_DIR!;%%PATH%% && ^
title !BACKEND_WIN! && ^
""!PHP_EXE!"" artisan serve --host=127.0.0.1 --port=8000"

timeout /t 3 /nobreak >nul

:: ---- start frontend ----
echo %C_INFO% Starting Next.js frontend...
echo %C_INFO%   http://localhost:3000

if defined VERBOSE (
    echo %C_INFO% [VERBOSE] Frontend launch command:
    echo cd /d "!SCRIPT_DIR!" ^&^& set PATH=!NODE_DIR!;%%%%PATH%%%% ^&^& title !FRONTEND_WIN! ^&^& call "!NPM_CMD!" run dev
    echo.
)

start "!FRONTEND_WIN!" cmd /s /k ^
"cd /d ""!SCRIPT_DIR!"" && ^
set PATH=!NODE_DIR!;%%PATH%% && ^
title !FRONTEND_WIN! && ^
call ""!NPM_CMD!"" run dev"

timeout /t 5 /nobreak >nul

:: Open browser
echo %C_OK% Opening browser...
start "" http://localhost:3000

echo.
echo ===== ACEC is running =====
echo.
echo   Frontend : http://localhost:3000
echo   Backend  : http://127.0.0.1:8000
echo   Admin    : http://127.0.0.1:8000/admin
echo.
echo   To stop : double-click stop-project.bat
echo.
pause
