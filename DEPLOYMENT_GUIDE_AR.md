# دليل نشر موقع ACEC على cPanel

## نظرة عامة على هيكل النشر

```
public_html/
├── ( محتويات مجلد out )       ← ملفات Frontend (HTML ثابت)
└── backend/                    ← مجلد Backend (Laravel)
```

> **ملاحظة:** الـ Frontend هو موقع ثابت (Static) يتم رفعه مباشرة في `public_html`، والـ Backend يتم وضعه في مجلد فرعي `backend` داخل `public_html`.

---

## الخطوة 1: بناء Frontend (Next.js) محلياً

**على جهازك المحلي (في Visual Studio Code أو Terminal):**

```bash
cd C:\laragon\www\acec
npm run build
```

بعد إنتهاء البناء، ستجد مجلد `out` في المشروع. هذا المجلد يحتوي على ملفات الموقع النهائية.

---

## الخطوة 2: إنشاء قاعدة بيانات MySQL في cPanel

1. سجّل الدخول إلى **cPanel**
2. اذهب إلى **MySQL Databases**
3. في حقل **Create New Database**، اكتب اسم قاعدة البيانات (مثال: `acec_db`)
4. اضغط **Create Database**
5. ارجع لأسفل الصفحة إلى **Add User to Database**
6. اختر المستخدم من القائمة (أو أنشئ مستخدم جديد أولاً)
7. اربط المستخدم بقاعدة البيانات
8. اختر **ALL PRIVILEGES** ثم اضغط **Make Changes**
9. **احفظ بيانات قاعدة البيانات:**
   - اسم قاعدة البيانات
   - اسم المستخدم
   - كلمة المرور

---

## الخطوة 3: رفع ملفات Backend (Laravel) إلى cPanel

1. في مدير الملفات **File Manager** في cPanel (أو عبر FTP):
   - اذهب إلى `public_html/`
   - أنشئ مجلد جديد باسم **`backend`**
2. ارفع جميع محتويات مجلد `backend` من مشروعك المحلي إلى `public_html/backend/`
   - **(لا تنسَ رفع مجلد `vendor` لأنه يحتوي على المكتبات)**

3. **تعديل ملف `.env`** في `public_html/backend/.env`:
   ```env
   APP_NAME="ACEC"
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://example.com
   APP_KEY=

   DB_CONNECTION=mysql
   DB_HOST=localhost
   DB_PORT=3306
   DB_DATABASE=acec_db          ← اسم قاعدة البيانات اللي أنشأتها
   DB_USERNAME=acec_user        ← اسم مستخدم قاعدة البيانات
   DB_PASSWORD=your_password    ← كلمة مرور قاعدة البيانات

   SESSION_DRIVER=file
   CACHE_DRIVER=file
   QUEUE_CONNECTION=sync
   ```

4. **ضبط الصلاحيات (Permissions):**
   - مجلد `storage` ← `775`
   - مجلد `bootstrap/cache` ← `775`

5. **تشغيل الأوامر عبر SSH (Terminal في cPanel):**
   ```bash
   cd public_html/backend
   php artisan key:generate
   php artisan migrate --force
   php artisan storage:link
   ```

---

## الخطوة 4: رفع ملفات Frontend إلى cPanel

1. من مجلد `out` في مشروعك المحلي، **حدد جميع الملفات والمجلدات**
2. ارفعها إلى **`public_html/`** مباشرة (وليس إلى مجلد backend)

> **مهم:** لا ترفع مجلد `out` نفسه - ارفع **محتوياته** فقط.

3. بعد الرفع، تأكد من وجود ملف `.htaccess` في `public_html/` (موجود مسبقاً في المشروع).

---

## الخطوة 5: ربط Frontend بـ Backend (ضبط API)

قبل بناء الـ Frontend في **الخطوة 1**، تأكد من تعديل المتغيرات في ملف `.env.local`:

```env
NEXT_PUBLIC_API_BASE=https://example.com/backend/public
NEXT_PUBLIC_SITE_URL=https://example.com
```

ثم **أعد بناء المشروع** (`npm run build`) وارفعه مرة أخرى.

---

## التحقق من العمل

### اختبار Backend (API)
افتح في المتصفح:
```
https://example.com/backend/public/api/v1/theme
https://example.com/backend/public/api/v1/clients
https://example.com/backend/public/api/v1/services/ar
```

### اختبار Frontend
```
https://example.com/ar
https://example.com/en
```

### اختبار لوحة التحكم
```
https://example.com/backend/public/admin
```

---

## استكشاف الأخطاء الشائعة

| المشكلة | الحل |
|---------|------|
| صفحة بيضاء | تحقق من `storage/logs/laravel.log` في مجلد backend |
| خطأ في قاعدة البيانات | تأكد من صحة بيانات الاتصال في `.env` |
| API لا يعمل | تأكد من تفعيل `mod_rewrite` في cPanel |
| 500 Internal Server Error | تأكد من صلاحية ملف `.env` و `APP_KEY` |
| CORS | أضف `'allowed_origins' => ['*']` في `backend/config/cors.php` |

---

## ترتيب التنفيذ السريع

1. إنشاء قاعدة بيانات في cPanel
2. رفع مجلد `backend` إلى `public_html/backend`
3. تشغيل `php artisan key:generate` و `migrate`
4. بناء Frontend محلياً: `npm run build`
5. رفع محتويات مجلد `out` إلى `public_html/`
6. اختبار الموقع

---

## الدعم الفني

- Email: info@ac-ec.com.sa
- Phone: +966 500 037 049