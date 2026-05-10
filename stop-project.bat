@echo off
setlocal enabledelayedexpansion

:: ============================================================================
::  ACEC — Stop Local Servers
::  Kills only processes started by this project
::  Targets:
::     1. CMD windows whose titles match ACEC-BACKEND-* / ACEC-FRONTEND-*
::     2. Processes listening on port 8000 (Laravel)
::     3. Processes listening on port 3000 (Next.js)
:: ============================================================================

set "C_INFO=[INFO]"
set "C_OK=[SUCCESS]"
set "C_WARN=[WARN]"
set "C_ERR=[ERROR]"

echo.
echo ===== Stopping ACEC Servers =====
echo.

:: -------------------------------------------------
::  1. Close our server windows by unique title
::     This is the safest kill — it only affects
::     CMD windows that were opened by start-project.bat
:: -------------------------------------------------
echo %C_INFO% Closing ACEC server windows...

taskkill /f /fi "WINDOWTITLE eq ACEC-Backend-58A2" >nul 2>&1
if not errorlevel 1 ( echo %C_OK%   Backend window closed ) else ( echo %C_INFO%   No backend window found )

taskkill /f /fi "WINDOWTITLE eq ACEC-Frontend-7C4B" >nul 2>&1
if not errorlevel 1 ( echo %C_OK%   Frontend window closed ) else ( echo %C_INFO%   No frontend window found )

echo.

:: -------------------------------------------------
::  2. Kill process listening on port 8000 (Laravel)
::     We find the PID from netstat output, then kill
::     only that specific process — not all php.exe.
:: -------------------------------------------------
echo %C_INFO% Releasing port 8000 (Laravel)...

set "PID_8000="
for /f "tokens=5" %%a in ('
    netstat -ano ^| findstr /R ":8000 " ^| findstr /R "LISTENING"
') do (
    set "PID_8000=%%a"
)

if defined PID_8000 (
    taskkill /f /pid "!PID_8000!" >nul 2>&1
    if not errorlevel 1 (
        echo %C_OK%   Process !PID_8000! killed (port 8000)
    ) else (
        echo %C_WARN% Could not kill process on port 8000 — try closing it manually
    )
) else (
    echo %C_INFO%   No process found on port 8000
)

echo.

:: -------------------------------------------------
::  3. Kill process listening on port 3000 (Next.js)
:: -------------------------------------------------
echo %C_INFO% Releasing port 3000 (Next.js)...

set "PID_3000="
for /f "tokens=5" %%b in ('
    netstat -ano ^| findstr /R ":3000 " ^| findstr /R "LISTENING"
') do (
    set "PID_3000=%%b"
)

if defined PID_3000 (
    taskkill /f /pid "!PID_3000!" >nul 2>&1
    if not errorlevel 1 (
        echo %C_OK%   Process !PID_3000! killed (port 3000)
    ) else (
        echo %C_WARN% Could not kill process on port 3000 — try closing it manually
    )
) else (
    echo %C_INFO%   No process found on port 3000
)

echo.
echo %C_OK% All ACEC servers stopped.
echo.
pause
