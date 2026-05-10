# ACEC — Local Development Guide

Run the full ACEC project (Next.js frontend + Laravel backend) on your Windows machine.

## Requirements

| Tool | Notes |
|------|-------|
| [Laragon](https://laragon.org/download/) **required** | Bundles PHP, Composer, MySQL, Node.js. Install then add PHP, Node.js, Composer via Laragon's Quick Add. |
| PHP 8.3+ | Added via Laragon → Menu → PHP → Quick Add |
| Composer | Added via Laragon → Menu → Tools → Quick Add |
| Node.js 18+ | Added via Laragon → Menu → Node.js → Quick Add |
| MySQL | Included with Laragon, starts automatically |

> The `start-project.bat` script auto-detects your Laragon installation at `C:\laragon` or `D:\laragon`. It finds the latest PHP, Composer, and Node.js versions automatically — **no system PATH configuration needed**.

---

## One-Click Start (Windows)

Just double-click **`start-project.bat`** in the project root.

| Phase | What happens |
|-------|-------------|
| **0** | Auto-detect Laragon, find PHP 8.x, Composer, Node.js, npm |
| **1** | Copy `.env`, run `composer install`, generate `APP_KEY`, run `migrate` |
| **2** | Run `npm install` |
| **3** | Check ports 8000 and 3000 are free |
| **4** | Open backend CMD → Laravel at **http://127.0.0.1:8000** |
|  | Open frontend CMD → Next.js at **http://localhost:3000** |
|  | Open browser automatically |

To stop: run **`stop-project.bat`** (kills processes on ports 3000 and 8000, closes server windows).

---

## Manual Setup

### 1. Backend (Laravel)

```bash
cd backend

# Environment
copy .env.example .env

# Install PHP dependencies
composer install

# Generate app encryption key
php artisan key:generate

# Run database migrations
php artisan migrate --force

# Start the API server
php artisan serve --host=127.0.0.1 --port=8000
```

### 2. Frontend (Next.js)

Open a **second terminal** in the project root:

```bash
# Install Node dependencies
npm install

# Start dev server
npm run dev
```

### 3. Access

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000/api/v1/...
- **Dashboard:** http://localhost:8000/admin

---

## Environment Files

| File | Purpose |
| --- | --- |
| `.env.local` | Frontend env vars (API URL) |
| `backend/.env` | Backend env vars (DB, app config) |
| `backend/.env.example` | Template for backend env |

**Frontend` `.env.local` values:
```env
NEXT_PUBLIC_API_BASE=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Understanding How the Script Works

`start-project.bat` does **not** depend on your Windows system PATH. Instead it:

1. Looks for Laragon at `C:\laragon` or `D:\laragon`
2. Scans `laragon\bin\php\` for the highest PHP version (e.g. `php-8.3.6`)
3. Finds `composer.phar` in `laragon\bin\composer\`
4. Scans `laragon\bin\nodejs\` for the highest Node.js version
5. Finds `npm.cmd` alongside Node.js
6. Uses **full explicit paths** (`C:\laragon\bin\php\php-8.3.6\php.exe`) for every command

This means Laragon's PHP, Composer, and Node.js **do not need to be in your system PATH**.

## Common Issues

### "Laragon not found"

The script checks `C:\laragon` and `D:\laragon`. If yours is elsewhere, edit `start-project.bat` and add your path to the `for %%p in (...)` loop at the top.

### "No PHP installation found"

Open Laragon → Menu → PHP → Quick Add → select a PHP 8.x version.

### "No Node.js installation found"

Open Laragon → Menu → Node.js → Quick Add → select a version.

### "npm not found"

npm ships with Node.js. If missing, reinstall Node.js via Laragon.

## Troubleshooting

### Script says "Tool not found" but it's installed

Run `where <tool>` in CMD. If not found, the tool is not in your system PATH.
The script relies on PATH — it does not hardcode Laragon paths.

### Port already in use

```cmd
netstat -ano | findstr :3000
netstat -ano | findstr :8000
```

The rightmost column is the PID. Kill it:

```cmd
taskkill /f /pid <PID>
```

Or just run `stop-project.bat`.

### Database connection refused

1. Make sure MySQL is running (check Laragon tray icon or Services)
2. Verify credentials in `backend\.env`:
   ```ini
   DB_CONNECTION=mysql
   DB_HOST=localhost
   DB_PORT=3306
   DB_DATABASE=acec_dashboard
   DB_USERNAME=root
   DB_PASSWORD=
   ```
3. Create the database if it doesn't exist:
   ```cmd
   mysql -u root -e "CREATE DATABASE IF NOT EXISTS acec_dashboard"
   ```

### Composer out of memory

```cmd
php -d memory_limit=-1 composer install
```

### npm install fails

```cmd
npm cache clean --force
npm install
```

If it still fails, delete `node_modules` and `package-lock.json`, then retry.

### Windows blocks the script (SmartScreen / Defender)

Right-click the `.bat` file → Properties → check "Unblock" → Apply.

### Blank page or API errors

1. Open browser DevTools (F12) → Console tab
2. Check the Network tab for failed API requests
3. Verify the backend is running at http://localhost:8000
4. Verify `NEXT_PUBLIC_API_BASE` in `.env.local` matches the backend URL

### CORS errors in browser

This is already configured in `backend/config/cors.php` — `http://localhost:3000` is whitelisted. If you run the frontend on a different port, add it there.

---

## Project Structure

```
acec/
├── src/               # Next.js app (App Router)
│   ├── app/
│   │   └── [locale]/ # Localized routes (ar, en)
│   ├── components/    # React components
│   ├── i18n/          # Internationalization config
│   └── lib/           # API client & utilities
├── backend/           # Laravel API
│   ├── app/
│   ├── config/
│   ├── routes/
│   └── ...
├── messages/          # Translation JSON files
├── public/            # Static assets
├── start-project.bat  # One-click launcher
├── stop-project.bat   # Stop all servers
└── README-LOCAL-RUN.md
```
