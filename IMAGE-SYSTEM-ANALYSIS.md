# ACEC Image & Storage System — Full Analysis

## 1. Project Overview

| Layer | Technology | Language |
|-------|-----------|----------|
| Backend API | Laravel 11 | PHP 8.2+ |
| Admin Dashboard | Filament 3 (PHP) | PHP |
| Frontend | Next.js 15 (App Router) | TypeScript |
| Database | MySQL (via Laragon) | SQL |
| Storage | Local filesystem (`storage/app/public`) | Disk |

---

## 2. How Images Are Stored (Backend)

### 2.1 Storage Configuration

**`config/filesystems.php`:**
```php
'public' => [
    'driver' => 'local',
    'root' => storage_path('app/public'),
    'url' => env('APP_URL').'/storage',
    'visibility' => 'public',
],
```

All images are stored under `storage/app/public/models/` organized by entity type:
```
storage/app/public/
  models/
    blog-posts/
    certifications/
    clients/
    hero/
    profile/
    projects/
      gallery/
    services/
    team-members/
    users/
  profile-pdfs/
  livewire-tmp/
```

A symlink `public/storage → storage/app/public` makes files accessible via `http://localhost:8000/storage/...`.

### 2.2 Database Schema (Image Columns)

| Table | Image Column(s) | Type |
|-------|----------------|------|
| `projects` | `image` (VARCHAR), `gallery` (JSON array) | Single + Gallery |
| `services` | `image` (VARCHAR) | Single |
| `clients` | `logo` (VARCHAR) | Single |
| `team_members` | `image` (VARCHAR) | Single |
| `blog_posts` | `image` (VARCHAR) | Single |
| `certifications` | `image` (VARCHAR) | Single |
| `hero_sections` | `image` (VARCHAR) | Single |
| `users` | `avatar` (VARCHAR) | Single |

### 2.3 HasImageCleanup Trait

**File:** `app/Traits/HasImageCleanup.php`

```php
trait HasImageCleanup {
    public static function bootHasImageCleanup(): void {
        static::deleting(function ($model) {
            // Deletes single image files (imageFields)
            // Deletes array image files (imageArrayFields)
        });
    }
}
```

Used by: `Project`, `Service`, `Client`, `TeamMember`, `Certification`, `BlogPost`

**Critical limitation:** The trait only fires on the `deleting` event. When an image is **replaced** (updated) via Filament, the old file is **not cleaned up** by this trait. Filament's `FileUpload` component handles the old-file deletion when a new file replaces it.

---

## 3. How Images Are Uploaded (Dashboard / Filament Admin)

### 3.1 Filament FileUpload Configuration

Every Filament resource that has an image uses the same pattern:

```php
FileUpload::make('image')
    ->label(__('admin.col_image'))
    ->image()
    ->disk('public')
    ->directory('models/projects')    // varies per entity
    ->maxSize(2048)                    // 2MB
    ->imageEditor()                    // built-in crop/rotate/flip
    ->acceptedFileTypes([
        'image/jpeg', 'image/png',
        'image/webp', 'image/gif',
    ]),
```

Directories per entity:
| Entity | Directory |
|--------|-----------|
| Project (main) | `models/projects` |
| Project (gallery) | `models/projects/gallery` |
| Service | `models/services` |
| Client | `models/clients` |
| Team Member | `models/team-members` |
| Blog Post | `models/blog-posts` |
| Certification | `models/certifications` |

### 3.2 Seeder Images

The `GeneratesPlaceholderImages` trait downloads placeholder images from picsum.photos or generates inline SVG placeholders when:
- Running database seeders
- No internet connection available

Images are saved to the same `storage/app/public/models/...` directories.

---

## 4. How Images Are Displayed (Frontend)

### 4.1 Image URL Pattern

All frontend components construct image URLs the same way:

```typescript
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";
// ...
`${API_BASE}/storage/${model.image}`
```

With fallback for missing images:
```typescript
// ProjectsSection, FeaturedWorkSection:
src={project.image
  ? `${API_BASE}/storage/${project.image}`
  : `/images/projects/${project.slug}.jpg`}

// ClientsSection:
logo: c.logo ? `${API_BASE}/storage/${c.logo}` : "/images/client-logo.svg"
```

### 4.2 Image Display Components

| Page/Component | Image Tag | Lazy Loading | Notes |
|---------------|-----------|-------------|-------|
| ProjectsSection | `<img>` | ✅ `loading="lazy"` | aspect-ratio 16/9, object-fit cover |
| FeaturedWorkSection | `<img>` | ✅ `loading="lazy"` | aspect-ratio 3/2, object-fit cover |
| ProjectDetailPage | `<img>` | ❌ No lazy | Full-width hero image |
| ServicesSection | ❌ No image | — | Uses number + text cards only |
| ServiceDetailPage | `<img>` | ❌ No lazy | Full-width |
| ClientsSection | `<Image>` (Next.js) | ✅ Built-in | fill + object-contain, grayscale filter |
| ClientPage | `<img>` | ❌ No lazy | Lightbox viewer |
| CertificationsGallery | `<img>` | ❌ No lazy | Lightbox, object-fit contain |
| BlogList | `<img>` | ❌ No lazy | Listed pg |
| BlogDetail | `<img>` | ❌ No lazy | Full-width |

### 4.3 Image Usage Inconsistencies

| Issue | Location |
|-------|----------|
| Mix of `<img>` and `next/Image>` | ClientsSection uses `next/Image`, everything else uses `<img>` |
| No `loading="lazy"` on detail pages | ProjectDetail, ServiceDetail, BlogDetail pages |
| No gallery images rendered on frontend | API returns `project.gallery` (JSON array) but never displayed |
| Service images not shown in ServicesSection | Service card UI uses number + text only, ignores `service.image` |
| No responsive image sizes | All images use fixed aspect-ratio with `object-fit: cover` |
| No WebP/AVIF conversion | Images served as uploaded (JPEG/PNG/GIF) |
| No image CDN | Direct from Laravel server |

---

## 5. Editing Images: Current Process

### 5.1 Via Filament Dashboard (Recommended)

1. Navigate to the resource (e.g. Projects → Edit)
2. The `FileUpload` component shows the current image
3. Click the image or "Delete" button to remove
4. Click "Upload" or drag-and-drop a new image
5. **What happens behind the scenes:**
   - Filament uploads to `storage/app/public/models/{entity}/` with a unique filename
   - The old file path in the database is replaced with the new path
   - **Filament's FileUpload automatically deletes the old file** from disk
   - The `HasImageCleanup` trait is **NOT** needed here — Filament handles it
   - The record is saved with the new image path

### 5.2 Via Code (Seeders / Direct updates)

- When seeding, `GeneratesPlaceholderImages` skips if file already exists
- When updating via API/CLI, old files remain unless manually deleted
- `HasImageCleanup` only fires on `deleting`, not on `updating`

### 5.3 Image Editor

Filament's `->imageEditor()` enables:
- Crop
- Rotate
- Flip

This happens client-side before upload.

---

## 6. Is This the Best Approach? — Evaluation & Recommendations

### ✅ What's Good

1. **Filament integration** — The FileUpload + imageEditor + old-file cleanup is mature and well-tested
2. **Consistent URL pattern** — `{API_BASE}/storage/{path}` across all components
3. **Organized directories** — `models/{entity}/` keeps files organized
4. **2MB size limit** — Prevents large uploads
5. **Image type restrictions** — Only JPEG/PNG/WebP/GIF allowed

### ❌ What Could Be Improved

#### Critical Issues

| Issue | Severity | Recommendation |
|-------|----------|---------------|
| Old images not deleted on update (HasImageCleanup only fires on `deleting`) | Medium | Add a `saving`/`saved` event that compares old vs new image and deletes the old file |
| No image optimization (WebP conversion, resizing) | High | Add Laravel `spatie/image-optimizer` or `intervention/image` for automatic compression |
| No responsive image breakpoints | Medium | Use `srcSet` for different viewport sizes, or serve via a CDN that handles it |

#### Frontend Issues

| Issue | Severity | Recommendation |
|-------|----------|---------------|
| Mix of `<img>` and `<Image>` | Low | Use next/Image everywhere for automatic optimization |
| Missing `loading="lazy"` on detail pages | Low | Add `loading="lazy"` to all images |
| Gallery images not displayed | Medium | Display `project.gallery` array as a slider/gallery on the project detail page |
| No image fallback consistency | Low | Standardize on one fallback pattern across all components |

#### Performance & Architecture

| Issue | Severity | Recommendation |
|-------|----------|---------------|
| Direct file serving from Laravel | High | Use a CDN (CloudFront, Cloudflare Images) or S3 for production |
| No cache headers | Medium | Add cache-control headers via Laravel or web server config |
| No image CDN transformations | Medium | Use Cloudflare Images, Imgix, or `spatie/image` for on-the-fly resizing |

### 🏆 Recommended Best Approach

For a production Laravel + Next.js application, the ideal image pipeline would be:

```
Upload (Filament)
    ↓
Laravel Store with optimization:
  - Convert to WebP (or AVIF)
  - Resize to predefined breakpoints (400, 800, 1200, 2000)
  - Store original too
    ↓
Storage driver: S3 + CloudFront (or local + CDN)
    ↓
API returns multiple URLs like:
  {
    "image": "uuid.webp",
    "image_srcset": "uuid-400.webp 400w, uuid-800.webp 800w, uuid-1200.webp 1200w"
  }
    ↓
Frontend uses next/Image with:
  <Image src={...} sizes="..." fill />
```

### ✅ Minimal Improvement (Easiest Wins)

1. **Add `loading="lazy"`** to all images on detail pages
2. **Display gallery images** on project detail page
3. **Use `next/Image`** consistently across all components
4. **Add cache headers** via `.htaccess` or Laravel middleware for `/storage/*`
5. **Delete old files on update** by extending `HasImageCleanup` to listen for `saving` event

---

## 7. Summary: All Image Paths

| Entity | DB Column | Storage Path | URL |
|--------|-----------|--------------|-----|
| Project | `image` | `models/projects/{file}` | `/storage/models/projects/{file}` |
| Project Gallery | `gallery` (JSON) | `models/projects/gallery/{file}` | `/storage/models/projects/gallery/{file}` |
| Service | `image` | `models/services/{file}` | `/storage/models/services/{file}` |
| Client | `logo` | `models/clients/{file}` | `/storage/models/clients/{file}` |
| Team Member | `image` | `models/team-members/{file}` | `/storage/models/team-members/{file}` |
| Blog Post | `image` | `models/blog-posts/{file}` | `/storage/models/blog-posts/{file}` |
| Certification | `image` | `models/certifications/{file}` | `/storage/models/certifications/{file}` |
| Hero Section | `image` | `models/hero/{file}` | `/storage/models/hero/{file}` |
| User Avatar | `avatar` | `models/users/{file}` | `/storage/models/users/{file}` |
| Profile PDF | `file_path` | `profile-pdfs/{file}` | `/storage/profile-pdfs/{file}` |
