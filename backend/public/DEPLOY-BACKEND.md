# ACEC Backend Deployment Guide

## 1. Files to Upload (via git pull)

```bash
cd /path/to/backend  # e.g., /home/forge/acec-backend
git pull origin main
```

### All changed backend files (latest commits):

| File | Purpose |
|------|---------|
| `backend/public/index.php` | Storage handler + Content-Disposition inline header |
| `backend/config/cors.php` | CORS origins (added localhost:3006, vercel, api/backend subdomains) |
| `backend/app/Filament/Resources/HeroSections/Schemas/HeroSectionForm.php` | Multi-image upload (slideshow) |
| `backend/app/Models/HeroSection.php` | `images` JSON array field |
| `backend/database/migrations/2026_06_25_082349_add_images_to_hero_sections_table.php` | DB migration: adds `images` column |
| `backend/database/seeders/HeroSeeder.php` | Seeds 3 slideshow images per locale |
| `backend/lang/ar/admin.php` | Arabic translation keys |
| `backend/lang/en/admin.php` | English translation keys |
| `backend/app/Http/Controllers/Api/ContentController.php` | Hero API cache TTL 3600→300s |

---

## 2. Run Commands (SSH into server)

```bash
# Navigate to backend directory
cd /path/to/backend

# 1. Install/update dependencies
composer install --no-dev --optimize-autoloader

# 2. Run new migrations
php artisan migrate

# 3. Seed hero slideshow images (first time only)
php artisan db:seed --class=HeroSeeder

# 4. Clear ALL cache (MANDATORY — config changed, cache busting)
php artisan optimize:clear

# 5. Re-cache for production
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# 6. Verify storage link (must exist)
php artisan storage:link
# Expected: "The [public/storage] link has been connected."
```

### What each command does:

| Command | Why |
|---------|-----|
| `composer install` | Ensures PHP dependencies are up to date |
| `php artisan migrate` | Creates the `images` JSON column in `hero_sections` table |
| `php artisan db:seed --class=HeroSeeder` | Inserts 3 sample slideshow images (ar + en) |
| `php artisan optimize:clear` | Clears config cache (CORS changes take effect), route cache, view cache, app cache |
| `php artisan config:cache` | Re-caches config for performance |
| `php artisan route:cache` | Re-caches routes |
| `php artisan view:cache` | Re-caches Blade views |
| `php artisan storage:link` | Creates `public/storage` symlink → `storage/app/public` |

---

## 3. Storage Files

Storage files (images, PDFs) are **NOT in git**. You must upload them separately.

### Directory structure on server:

```
storage/app/public/
├── models/
│   ├── hero/              ← Hero slider images + slideshow gallery
│   ├── projects/          ← Project main images
│   │   └── gallery/       ← Project gallery (multiple images per project)
│   ├── clients/           ← Client logos
│   ├── certifications/    ← Certification images
│   ├── services/          ← Service images
│   ├── team-members/      ← Team photos
│   ├── blog-posts/        ← Blog images
│   ├── users/             ← User avatars
│   └── profile/           ← Profile images (not PDF)
└── profile-pdfs/          ← Company profile PDF files
```

### How to upload storage:

**Option A — rsync (SSH, recommended for first deploy):**
```bash
rsync -avz --rsync-path="cd /path/to/backend && rsync" \
  storage/app/public/ \
  user@server:/path/to/backend/storage/app/public/
```

**Option B — Upload via Admin Dashboard:**
Upload each image through the Filament admin panel (`/admin`). The `HasImageCleanup` trait handles file storage automatically.

**Option C — Upload PHPMyAdmin + manual file copy:**
- Copy files to the correct directory
- Ensure paths in DB match (e.g., `models/hero/ar.jpg`)

### Correct file permissions:
```bash
chmod -R 775 storage/app/public
chmod -R 775 storage/framework
chmod -R 775 storage/logs
chown -R www-data:www-data storage bootstrap/cache
```

---

## 4. Environment (.env)

Ensure these values on the server:

```env
APP_URL=https://backend.ac-ec.com.sa
FILESYSTEM_DISK=public

# Cache — file is fine, redis is better
CACHE_DRIVER=file

# Database — your production credentials
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=acec
DB_USERNAME=...
DB_PASSWORD=...
```

---

## 5. Verify Deployment

### Test API endpoints:

```bash
# Hero with slideshow images
curl https://backend.ac-ec.com.sa/api/v1/hero/ar
# → "images": ["models/hero/ar-slide-1.jpg", ...]

# All clients
curl https://backend.ac-ec.com.sa/api/v1/clients

# All projects
curl https://backend.ac-ec.com.sa/api/v1/projects/ar

# Active profile PDF
curl https://backend.ac-ec.com.sa/api/v1/profile-pdf/active
```

### Test image serving:

```bash
curl -I https://backend.ac-ec.com.sa/storage/models/hero/ar.jpg
# → 200 OK, Content-Type: image/jpeg, Access-Control-Allow-Origin: *
```

### Test CORS:

```bash
curl -H "Origin: https://acec-iota.vercel.app" \
  -H "Access-Control-Request-Method: GET" \
  -X OPTIONS \
  https://backend.ac-ec.com.sa/api/v1/hero/ar
# → 200 OK, Access-Control-Allow-Origin: https://acec-iota.vercel.app
```

---

## 6. Common Issues

| Symptom | Cause | Fix |
|---------|-------|-----|
| API returns old data | Cache not cleared | `php artisan cache:clear` |
| Images return 404 | Storage files not uploaded | Upload files, check paths in DB |
| CORS errors in browser | Origin not in `cors.php` | Add to `allowed_origins`, `php artisan config:cache` |
| Migration error | Already run | `php artisan migrate --pretend` to check |
| 500 error after deploy | Cache mismatch | `php artisan optimize:clear` |
| "No application encryption key" | Missing APP_KEY | `php artisan key:generate` |
| Storage URL returns 404 | No symlink | `php artisan storage:link` |

---

## 7. Files NOT tracked in git (must upload manually)

- `backend/storage/app/public/models/*` — All uploaded images
- `backend/storage/app/public/profile-pdfs/*` — PDF files
- `backend/.env` — Environment configuration
- `backend/vendor/` — Composer dependencies (run `composer install`)

---

## 8. Quick Deploy Checklist

- [ ] `git pull origin main`
- [ ] `composer install --no-dev --optimize-autoloader`
- [ ] `php artisan migrate`
- [ ] `php artisan db:seed --class=HeroSeeder` (first time only)
- [ ] `php artisan optimize:clear`
- [ ] `php artisan config:cache`
- [ ] `php artisan route:cache`
- [ ] `php artisan storage:link`
- [ ] Upload storage files (rsync or via admin)
- [ ] Set correct permissions: `chmod -R 775 storage bootstrap/cache`
- [ ] Test API: `/api/v1/hero/ar`, `/api/v1/clients`
- [ ] Test CORS: curl with `-H "Origin: https://acec-iota.vercel.app"`
- [ ] Test image: `/storage/models/hero/ar.jpg`
