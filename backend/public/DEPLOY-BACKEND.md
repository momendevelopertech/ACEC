# ACEC Backend Deployment Guide

## 0. Database (Import Manual)

**هتصدر الداتا بيز من اللوكال وتعمل import على السيرفر — صح كده.**

### تصدير من اللوكال (phpMyAdmin):
1. افتح `http://localhost/phpmyadmin`
2. اختار قاعدة بيانات `acec`
3. تبويب **Export** → طريقة **Quick** → تنسيق **SQL** → **Go**
4. هينزل ملف `.sql`

### استيراد على السيرفر:
**Option A — phpMyAdmin:**
1. افتح phpMyAdmin على السيرفر
2. اختار قاعدة البيانات (أو اعملها جديدة)
3. تبويب **Import** → اختار ملف `.sql` → **Go**

**Option B — Command line (أسرع للـ SQL الكبير):**
```bash
mysql -u username -p acec_database < /path/to/exported-file.sql
```

### مهم بعد الاستيراد:
- تأكد إن الجداول كلها موجودة (hero_sections, projects, clients, ...)
- لو في migrations جديدة بعد التصدير، شغّل: `php artisan migrate`

---

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

# 6. File storage link
php artisan storage:link

# 7. ⚠️ لا تشغّل php artisan route:cache
#    Filament ما بيشتغلش مع route caching.
#    بداله شغّل:
php artisan filament:cache

# 8. Cache config بس (من غير routes)
php artisan config:cache

# 9. صلاحيات الملفات
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
| `php artisan storage:link` | يعمل `public/storage` → `storage/app/public` |
| `php artisan filament:cache` | يعمل cache لـ Filament components (بديل route cache) |
| `php artisan config:cache` | يخزن config في ملف واحد للسرعة (ممنوع route cache مع Filament) |

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

## 6. Troubleshooting — Route [filament.admin.resources.hero-sections.index] not defined

### السبب:
`php artisan route:cache` مش بيشتغل مع Filament. ولَّا `optimize:clear` مسح ملف الـ route cache و اتضرب تاني.

### الحل الفوري (شغّله على السيرفر):
```bash
cd /path/to/backend
php artisan optimize:clear
php artisan filament:cache
php artisan config:cache
```

### إزاي تمنعها:
- **ممنوع** تشغّل `php artisan route:cache` خالص — Filament ما بيستحملش route caching
- دايماً استعمل `php artisan filament:cache` بداله
- لو مسحت الكاش بـ `optimize:clear`، برضه شغّل `filament:cache` تاني

### لو لسه المشكلة موجودة:
```bash
# امسح ملفات الكاش يدوي
rm -rf bootstrap/cache/*.php

# ارجع شغّل
php artisan optimize:clear
php artisan filament:cache
php artisan config:cache
```

---

## 7. Quick Checklist

- [ ] **تصدير الداتا بيز** من phpMyAdmin اللوكال (ملف `.sql`)
- [ ] **استيراد الداتا بيز** على السيرفر (phpMyAdmin أو command line)
- [ ] رفعت فولدر `backend/` كامل على السيرفر (من غير `.env` و `vendor`)
- [ ] رفعت الـ storage files (صور + PDF) في `storage/app/public/`
- [ ] `composer install --no-dev --optimize-autoloader`
- [ ] `php artisan migrate` (لو في ميجريشن جديد)
- [ ] `php artisan db:seed --class=HeroSeeder` (لو أول مرة)
- [ ] `php artisan optimize:clear`
- [ ] `php artisan filament:cache` (⚠️ مش route:cache — Filament ما بيشتغلش معاه)
- [ ] `php artisan config:cache`
- [ ] `php artisan storage:link`
- [ ] `chmod -R 775 storage bootstrap/cache`
- [ ] `chown -R www-data:www-data storage bootstrap/cache`
- [ ] اختبرت API: `/api/v1/hero/ar`, `/api/v1/clients`
- [ ] اختبرت CORS من المتصفح
- [ ] حذفت `deploy-check.php`
