# ACEC Image & File Storage System

## Architecture Overview

```
Frontend (Next.js)                  Backend (Laravel)
    │                                     │
    │  GET /storage/models/hero/x.jpg     │
    │────────────────────────────────>    │
    │                                     │
    │  public/index.php                   │
    │  └─ parse_url(REQUEST_URI)          │
    │  └─ urldecode(path)                │
    │  └─ file_exists(storage_path)      │
    │  └─ serve file + headers           │
    │                                     │
    │  <───────────────────────────────  │
    │      200 OK + Cache-Control        │
```

All files are stored on the **Laravel backend** disk (`storage/app/public`). The frontend requests them through the backend's `index.php` storage handler — **not** directly from the filesystem.

---

## Directory Structure

```
backend/storage/app/public/           ← Laravel's public disk
├── models/
│   ├── hero/                         ← Hero section (slider) images
│   ├── projects/                     ← Project main images
│   │   └── gallery/                  ← Project gallery images
│   ├── clients/                      ← Client logos
│   ├── certifications/               ← Certification images
│   ├── services/                     ← Service images
│   ├── team-members/                 ← Team member photos
│   ├── blog-posts/                   ← Blog post images
│   ├── users/                        ← User profile photos
│   └── profile/                      ← Profile images
├── profile-pdfs/                     ← Company profile PDF files
└── livewire-tmp/                     ← Temporary uploads (auto-cleaned)
```

---

## Entity-to-Path Mapping

| Entity | DB Model | Disk Directory | DB Field | Filament Form |
|--------|----------|----------------|----------|---------------|
| Hero Section | `HeroSection` | `models/hero/` | `image` (single), `images` (JSON array) | `FileUpload::make('image')`, `FileUpload::make('images')->multiple()` |
| Project | `Project` | `models/projects/` | `image` (single) | `FileUpload::make('image')` |
| Project Gallery | `Project` | `models/projects/gallery/` | `gallery` (JSON array) | `FileUpload::make('gallery')->multiple()` |
| Client | `Client` | `models/clients/` | `logo` (single) | `FileUpload::make('logo')` |
| Certification | `Certification` | `models/certifications/` | `image` (single) | `FileUpload::make('image')` |
| Service | `Service` | `models/services/` | `image` (single) | `FileUpload::make('image')` |
| Team Member | `TeamMember` | `models/team-members/` | `image` (single) | `FileUpload::make('image')` |
| Blog Post | `BlogPost` | `models/blog-posts/` | `image` (single) | `FileUpload::make('image')` |
| Profile PDF | `ProfilePdf` | `profile-pdfs/` | `pdf_file` (single) | `FileUpload::make('pdf_file')` |

---

## How Image Uploads Work

### 1. Upload Flow (Dashboard → Storage)

```
Admin uploads in Filament
        │
        ▼
Filament FileUpload component
  ├─ Generates unique filename (UUID)
  ├─ Stores file → storage/app/public/models/{entity}/{uuid}.{ext}
  ├─ Saves relative path → DB column (e.g. "models/hero/abc123.jpg")
  └─ Fires model `saving` event
        │
        ▼
HasImageCleanup trait
  ├─ Checks if the image field is dirty (changed)
  ├─ If yes → deletes the old file from disk
  └─ Saves new path to DB
        │
        ▼
ClearsModelCache trait
  └─ Calls Cache::flush() → all API caches are invalidated
```

### 2. Serving Flow (Frontend → Backend)

```
Frontend renders <img src="https://backend.ac-ec.com.sa/storage/models/hero/abc123.jpg?v=1719235200" />
        │
        ▼
Backend public/index.php
  ├─ Intercepts /storage/* requests
  ├─ Strips query string (?v=timestamp) → pure path
  ├─ Validates: no directory traversal (.., //, \\)
  ├─ Checks file_exists(storage/app/public/models/hero/abc123.jpg)
  ├─ Sets headers:
  │   ├─ Content-Type (auto-detected from extension)
  │   ├─ Cache-Control: public, max-age=86400
  │   ├─ Access-Control-Allow-Origin: *
  │   └─ X-Content-Type-Options: nosniff
  └─ Sends file via readfile()
```

### 3. Update Flow (Editing an existing record)

```
Admin edits record in Filament
        │
        ▼
Filament loads existing value for FileUpload field
  ├─ If admin uploads a NEW file:
  │   ├─ Filament stores new file → new UUID filename
  │   ├─ HasImageCleanup::saving fires
  │   ├─ Deletes OLD file from disk
  │   └─ DB updated with new path
  │
  ├─ If admin REMOVES file (clears upload):
  │   ├─ HasImageCleanup::saving fires
  │   ├─ Deletes old file from disk
  │   └─ DB field set to null
  │
  └─ ClearsModelCache::saved fires → Cache::flush()
```

### 4. Delete Flow

```
Admin deletes entire record
        │
        ▼
HasImageCleanup::deleting fires
  ├─ Deletes single image (imageFields)
  └─ Deletes all images in array (imageArrayFields)

ClearsModelCache::deleted fires → Cache::flush()
```

---

## Frontend Image Loading Strategy

### Component: `ImageWithLoader.tsx`

```
┌─────────────────────────────────┐
│  ImageWithLoader                │
│  ┌───────────────────────────┐  │
│  │  Shimmer placeholder      │  │  ← while loading
│  │  (animated gradient)      │  │
│  │  + loading-spinner        │  │
│  ├───────────────────────────┤  │
│  │  <img> with opacity-100   │  │  ← after loaded
│  └───────────────────────────┘  │
│  │ Fallback: spinner/fallback │  │  ← on error
└─────────────────────────────────┘

Preload: new Image() constructor in useEffect
  ├─ Image loads in background
  ├─ Once complete → render <img> (browser cache serves instantly)
  └─ No double-fetching
```

### Hero Section Slideshow Preloading

```
HeroSection mounts
  ├─ fetch(/api/v1/hero/{locale})
  ├─ on response → build image URLs
  ├─ preloadImages(allUrls) → new Image() for each
  │   └─ Promise resolves when ALL images are loaded
  ├─ setImagesReady(true)
  ├─ Start slideshow interval (6s)
  └─ Show images with CSS crossfade
```

---

## Cache-Busting Strategy

| Layer | Mechanism | TTL |
|-------|-----------|-----|
| **Backend API** | `Cache::remember("hero.{lang}", 300, ...)` | 5 min |
| **Model Cache** | `ClearsModelCache::saved()` → `Cache::flush()` | Immediate on save |
| **Image URL** | `?v={updated_at->timestamp}` query param | Changes on every edit |
| **Storage Handler** | `Cache-Control: public, max-age=86400` | 24h (browser) |
| **Next.js ISR** | `revalidate: 5m` on page config | 5 min |

---

## Local vs Server Configuration

### Local (Development)
```
Backend URL:       http://localhost:8000
Frontend API:      NEXT_PUBLIC_API_BASE=http://localhost:8000
Storage disk:      backend/storage/app/public/
Storage symlink:   backend/public/storage → backend/storage/app/public/
Cache driver:      file (backend/storage/framework/cache/data/)
```

### Server (Production)
```
Backend URL:       https://backend.ac-ec.com.sa
Frontend API:      NEXT_PUBLIC_API_BASE=https://backend.ac-ec.com.sa (in .env)
Storage disk:      /path/to/backend/storage/app/public/
Storage handler:   public/index.php (no symlink needed)
Cache driver:      file (or redis if configured)
```

**⚠️ Important**: The `.env.local` file on the local machine overrides `.env`:
```env
# .env.local (local)
NEXT_PUBLIC_API_BASE=http://localhost:8000

# .env (production — committed to git)
NEXT_PUBLIC_API_BASE=https://backend.ac-ec.com.sa
```

---

## Performance Optimizations

### Current
- ✅ Images have `?v=updated_at` cache-busting
- ✅ Backend API caches for 300s (5 min)
- ✅ Model saves flush all cache immediately
- ✅ ImageWithLoader preloads via `new Image()` before rendering
- ✅ CSS crossfade for hero slideshow (GPU-accelerated opacity)
- ✅ Shimmer/skeleton placeholders while loading
- ✅ Next.js `unoptimized: true` (no double-processing)
- ✅ Storage handler auto-detects MIME types

### Recommendations for Production
- [ ] Add **nginx** or **Cloudflare** caching for static image files
- [ ] Set far-future `Cache-Control` + `ETag` for images (hash-based)
- [ ] Implement **image resizing** on upload (Filament can do this with `ImageEditor`)
- [ ] Use **WebP** format (Filament's `imageEditor()` supports conversion)
- [ ] Add **lazy loading** with `IntersectionObserver` for non-critical images
- [ ] Move to **Redis cache** for better `Cache::flush()` reliability on Windows sharing hosting
- [ ] Consider **CDN** (e.g., Cloudflare Images) for production image delivery

---

## File Cleanup (HasImageCleanup Trait)

```php
// Models using this trait:
HeroSection   → $imageFields = ['image'], $imageArrayFields = ['images']
Project       → $imageFields = ['image'], $imageArrayFields = ['gallery']
Client        → $imageFields = ['logo']
Certification → $imageFields = ['image']
Service       → $imageFields = ['image']
TeamMember    → $imageFields = ['image']
BlogPost      → $imageFields = ['image']
ProfilePdf    → $imageFields = ['pdf_file']
```

The trait fires on two events:
- **`saving`**: Deletes old file only when the field is `isDirty()` (changed)
- **`deleting`**: Deletes all associated files when the record is deleted

This ensures no orphaned files accumulate on disk.

---

## How to Verify Storage

### Check which files exist on disk:
```bash
# Local (PowerShell)
Get-ChildItem backend\storage\app\public\models\ -Recurse -File

# Server (SSH)
find storage/app/public/models -type f | head -20
```

### Check what's in the database:
```sql
SELECT id, lang, image, images FROM hero_sections;
SELECT id, slug, image, gallery FROM projects;
SELECT id, name_ar AS name, logo FROM clients;
SELECT id, name_ar AS name, image FROM certifications;
```

### Test the storage handler:
```
GET http://localhost:8000/storage/models/hero/ar.jpg
  → 200 + image/jpeg

GET http://localhost:8000/storage/models/hero/ar.jpg?v=1234567890
  → 200 (query string is stripped)
```
