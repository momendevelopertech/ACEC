# ACEC - Static Export Deployment Guide (cPanel)

This project is configured for **Next.js static export** and can be deployed on shared hosting (cPanel) without a Node.js runtime.

## 1) Create environment file

Create `.env.local` at the project root:

```bash
NEXT_PUBLIC_API_BASE=https://api.example.com
```

> `NEXT_PUBLIC_API_BASE` is required because the contact form now sends requests to an external backend endpoint (`/api/v1/contact`) instead of using Next.js API routes.

## 2) Install dependencies

```bash
npm install
```

## 3) Build static output

```bash
npm run build
```

This generates the static site in `out/`.

## 4) Verify generated static files

Confirm these files exist after build:

- `out/ar/index.html`
- `out/en/index.html`
- `out/ar/services/consulting/index.html`

## 5) Upload to cPanel

1. Open your hosting file manager or FTP.
2. Upload the **contents of `out/`** into `public_html/`.
3. Upload rewrite rules file to `public_html/.htaccess`.

A deployment copy is provided at:

- `.htaccess`
- `deployment/.htaccess`

## 6) Optional local static preview

```bash
npx serve out
```

Then open the URL shown by `serve`.

## Notes

- This static export setup does not use Next.js server runtime.
- Internal App Router API routes are removed.
- Dynamic routes are pre-generated during build via `generateStaticParams`.
