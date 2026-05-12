# ACEC — Arabian Consulting & Engineering Center

Multilingual corporate website with a Laravel Filament admin dashboard. Built with Next.js (static export) + Laravel API backend.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React 18, TypeScript, Tailwind CSS 4, Framer Motion |
| Backend | Laravel 11, Filament 3 (admin panel) |
| Database | MySQL |
| I18n | next-intl (Arabic / English, RTL support) |
| Theme | Dynamic theme system with live switching via Context API |

## Features

- **Multilingual** — Full Arabic/English support with RTL/LTR layout
- **Dynamic theming** — Gold/dark theme system with live switching from admin panel
- **Static export** — Frontend builds to static HTML for cPanel deployment
- **Filament admin** — Manage projects, services, blog, team, clients, certifications, job postings, and themes
- **Contact form** — API-backed with rate limiting
- **One-click local run** — `start-project.bat` auto-detects Laragon tools

## Quick Start (Local Development)

See **[README-LOCAL-RUN.md](README-LOCAL-RUN.md)** for full setup instructions including one-click launcher.

### Prerequisites

- [Laragon](https://laragon.org/download/) (PHP 8.3+, Composer, Node.js 18+, MySQL)

### Manual Setup

```bash
# 1. Backend
cd backend
copy .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve --host=127.0.0.1 --port=8000

# 2. Frontend (new terminal, project root)
npm install
npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/v1/...
- Admin panel: http://localhost:8000/admin

## Production Deployment (cPanel)

See **[DEPLOYMENT_GUIDE_AR.md](DEPLOYMENT_GUIDE_AR.md)** for Arabic deployment instructions.

```bash
# Build static export
npm install
npm run build
# Upload contents of out/ to public_html/
```

## Environment Variables

| File | Purpose |
|------|---------|
| `.env.local` | Frontend — `NEXT_PUBLIC_API_BASE`, `NEXT_PUBLIC_SITE_URL` |
| `backend/.env` | Backend — database, mail, app config |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/theme` | Active theme |
| GET | `/api/v1/services/{lang}` | Services list |
| GET | `/api/v1/projects/{lang}` | Projects list |
| GET | `/api/v1/blog/{lang}` | Blog posts |
| GET | `/api/v1/team/{lang}` | Team members |
| POST | `/api/v1/contact` | Submit contact form |
| GET | `/api/themes` | All themes (admin) |
| POST | `/api/themes/{id}/activate` | Activate theme |
