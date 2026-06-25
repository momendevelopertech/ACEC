# ACEC Backend Deployment Guide

## 1. What to Upload

ارفَع **فولدر `backend/` كامل** على السيرفر (عبر FTP, rsync, cPanel, File Manager, إلخ).

### مهم — استبعد الملفات دي:
| ملف | ليه تستبعده |
|-----|-------------|
| `backend/.env` | ده خاص بجهازك — السيرفر عنده `.env` بتاعه |
| `backend/storage/app/public/` | الملفات المرفوعة (صور، PDF) بتنرفع لوحدها |
| `backend/storage/framework/cache/data/` | كاش محلي مش لازم يتنقل |
| `backend/storage/logs/` | لوجات محلية |
| `backend/vendor/` | الأحسن تعمل `composer install` على السيرفر |

### لو عايز تعمل rsync مباشر:
```bash
# من جهازك اللوكال
rsync -avz --delete \
  --exclude='.env' \
  --exclude='storage/app/public/models/' \
  --exclude='storage/app/public/profile-pdfs/' \
  --exclude='storage/framework/cache/' \
  --exclude='storage/logs/' \
  --exclude='vendor/' \
  --exclude='.git/' \
  ./backend/ user@server.com:/path/to/backend/
```

---

## 2. Storage Files (صور، PDF)

الستوريج مش في git و مش في الـ zip. ارفعها لوحدها.

### المسارات المطلوبة على السيرفر:

```
backend/storage/app/public/
├── models/
│   ├── hero/              ← صور الهيرو (ar.jpg, en.jpg, ar-slide-1.jpg, ...)
│   ├── projects/          ← صور المشاريع
│   │   └── gallery/       ← معارض المشاريع (صور متعددة لكل مشروع)
│   ├── clients/           ← شعارات العملاء
│   ├── certifications/    ← صور الشهادات
│   ├── services/          ← صور الخدمات
│   ├── team-members/      ← صور فريق العمل
│   ├── blog-posts/        ← صور المقالات
│   ├── users/             ← صور المستخدمين
│   └── profile/
└── profile-pdfs/          ← ملفات PDF التعريفية
```

### طريقة الرفع:

**Option A — rsync من جهازك:**
```bash
rsync -avz ./backend/storage/app/public/ user@server.com:/path/to/backend/storage/app/public/
```

**Option B — ارفع via Admin Dashboard:**
ادخل `/admin` و ارفع الصور من الـ Filament forms — هي automatically تتحط في المكان الصح.

**Option C — يدوي:**
انسخ الملفات في المسار الصح باستخدام cPanel File Manager أو FTP.

### الصلاحيات:
```bash
chmod -R 775 storage/app/public
chmod -R 775 storage/framework
chmod -R 775 storage/logs
chown -R www-data:www-data storage bootstrap/cache
```

---

## 3. Environment (.env)

**لا ترفع `.env` من جهازك.** السيرفر لازم يكون عنده `.env` خاص بيه:

```env
APP_URL=https://backend.ac-ec.com.sa
APP_KEY=base64:...                      # php artisan key:generate
FILESYSTEM_DISK=public
CACHE_DRIVER=file

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=acec
DB_USERNAME=acec_user
DB_PASSWORD=...
```

---

## 4. الأوامر اللي تشغّلها (SSH)

```bash
# 1. ادخل على مسار الباك اند
cd /path/to/backend

# 2. نزل dependencies (مش محتاج ترفع مجلد vendor)
composer install --no-dev --optimize-autoloader

# 3. شغّل الميجرشن الجديد (إضافة عمود images لجدول hero_sections)
php artisan migrate

# 4. سييد صور الهيرو السلايدر (أول مرة بس)
php artisan db:seed --class=HeroSeeder

# 5. امسح كل الكاش (مهم جداً — عشان config و CORS يتحدثوا)
php artisan optimize:clear

# 6. عيد الكاش للبرودكشن
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 7. لو الـ storage link مش موجود
php artisan storage:link

# 8. صلاحيات الملفات
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

### شرح كل أمر:

| الأمر | ليه؟ |
|-------|------|
| `composer install --no-dev` | ينزل PHP packages بدون أدوات التطوير |
| `php artisan migrate` | يضيف عمود `images` JSON لجدول `hero_sections` |
| `php artisan db:seed --class=HeroSeeder` | يحط 3 صور سلايدر تجريبية (عربي + إنجليزي) |
| `php artisan optimize:clear` | يمسح كل الكاش — عشان التغييرات اللي في config و CORS تشتغل |
| `php artisan config:cache` | يخزن config في ملف واحد للسرعة |
| `php artisan route:cache` | يخزن routes في ملف واحد |
| `php artisan storage:link` | يعمل `public/storage` → `storage/app/public` |

**لو ظهرت أخطاء:** ارجع شغل `php artisan optimize:clear` أول حاجة.

---

## 5. Verification

### API:
```bash
curl https://backend.ac-ec.com.sa/api/v1/hero/ar
# لازم تشوف "images": ["models/hero/ar-slide-1.jpg", ...]

curl https://backend.ac-ec.com.sa/api/v1/clients
# لازم تشوف قائمة العملاء
```

### صورة:
```bash
curl -I https://backend.ac-ec.com.sa/storage/models/hero/ar.jpg
# لازم 200 OK و Content-Type: image/jpeg
```

### CORS:
افتح المتصفح على `https://acec-iota.vercel.app` — لو API شغال و CORS مضبوط، الداتا تظهر.

### Health Check:
افتح `https://backend.ac-ec.com.sa/deploy-check.php` في المتصفح — هيعرض كل حاجة (PHP, database, storage, API, CORS). **احذف الملف بعد ما تتأكد**:
```bash
rm deploy-check.php
```

---

## 6. Quick Checklist

- [ ] رفعت فولدر `backend/` كامل على السيرفر (من غير `.env` و `vendor`)
- [ ] رفعت الـ storage files (صور + PDF) في `storage/app/public/`
- [ ] `composer install --no-dev --optimize-autoloader`
- [ ] `php artisan migrate`
- [ ] `php artisan db:seed --class=HeroSeeder` (مرة واحدة)
- [ ] `php artisan optimize:clear`
- [ ] `php artisan config:cache`
- [ ] `php artisan route:cache`
- [ ] `php artisan storage:link`
- [ ] `chmod -R 775 storage bootstrap/cache`
- [ ] `chown -R www-data:www-data storage bootstrap/cache`
- [ ] اختبرت API: `/api/v1/hero/ar`, `/api/v1/clients`
- [ ] اختبرت CORS من المتصفح
- [ ] حذفت `deploy-check.php`
