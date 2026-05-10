@echo off
setlocal enabledelayedexpansion

:: ============================================================================
::  ACEC — Stop Local Servers
::  Fully Laragon-aware.  Kills only this project's processes.
::  Targets:
::     1. CMD windows whose title matches ACEC-Backend-58A2 / ACEC-Frontend-7C4B
::     2. The specific PID listening on port 8000 (Laravel)
::     3. The specific PID listening on port 3000 (Next.js)
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
::     Only matches windows started by start-project.bat
:: -------------------------------------------------
echo %C_INFO% Closing ACEC server windows...

taskkill /f /fi "WINDOWTITLE eq ACEC-Backend-58A2" >nul 2>&1
if not errorlevel 1 ( echo %C_OK%   Backend window closed ) else ( echo %C_INFO%   No backend window open )

taskkill /f /fi "WINDOWTITLE eq ACEC-Frontend-7C4B" >nul 2>&1
if not errorlevel 1 ( echo %C_OK%   Frontend window closed ) else ( echo %C_INFO%   No frontend window open )

echo.

:: -------------------------------------------------
::  2. Kill the process listening on port 8000
::     Finds the PID from netstat — kills only that PID,
::     not all php.exe processes on the system.
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
        echo %C_OK%   Process !PID_8000! killed ^(port 8000^)
    ) else (
        echo %C_WARN% Could not kill PID !PID_8000! — try closing it manually
    )
) else (
    echo %C_INFO%   No process found on port 8000
)

echo.

:: -------------------------------------------------
::  3. Kill the process listening on port 3000
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
        echo %C_OK%   Process !PID_3000! killed ^(port 3000^)
    ) else (
        echo %C_WARN% Could not kill PID !PID_3000! — try closing it manually
    )
) else (
    echo %C_INFO%   No process found on port 3000
)

echo.
echo %C_OK% All ACEC servers stopped.
echo.
pause
