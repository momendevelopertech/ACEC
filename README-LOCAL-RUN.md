# ACEC — Local Development Guide

Run the full ACEC project (Next.js frontend + Laravel backend) on your Windows machine.

## System Requirements

| Tool      | Minimum Version | How to Check       |
| --------- | --------------- | ------------------ |
| PHP       | 8.3+            | `php -v`           |
| Composer  | 2.x             | `composer --version` |
| Node.js   | 18+             | `node -v`          |
| npm       | 9+              | `npm -v`           |
| MySQL     | 5.7+ / 8.x      | `mysql --version`  |

> **Recommended:** Use [Laragon](https://laragon.org/) — it bundles PHP, Composer, MySQL, and Nginx/Apache.

---

## One-Click Start (Windows)

Just double-click **`start-project.bat`** in the project root.

**Phase 1 — Setup (main window):**
1. Copy `backend/.env.example` → `backend/.env` (if missing)
2. Run `composer install` (if vendor is missing)
3. Generate Laravel `APP_KEY` (if not set)
4. Run `php artisan migrate --force`
5. Run `npm install` (if node_modules is missing)

**Phase 2 — Launch (separate CMD windows):**
6. Opens backend window → Laravel at **http://127.0.0.1:8000**
7. Opens frontend window → Next.js at **http://localhost:3000**
8. Opens browser automatically

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

## Pre-flight Checks

Before running `start-project.bat`, verify all tools are in your PATH:

```cmd
where php
where composer
where node
where npm
```

Each should return a path. If any say "not found", add them to your PATH or use Laragon.

### Common PATH issues with Laragon

Laragon adds its tools to PATH only inside its own terminal. To make them available system-wide:

1. Open Laragon → Menu → Tools → Path Manager
2. Add: `C:\laragon\bin\php\php-8.3.x` (adjust version)
3. Add: `C:\laragon\bin\composer`
4. Add: `C:\laragon\bin\nodejs\node-20`
5. Restart your computer

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
