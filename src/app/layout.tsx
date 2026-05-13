import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 0, 0';
}

const CSS_VAR_MAP: Record<string, string> = {
  bg_primary: '--color-bg',
  bg_secondary: '--color-surface',
  bg_section_alt: '--color-surface-2',
  text_primary: '--color-text',
  text_dark: '--color-text-dark',
  text_secondary: '--color-text-muted',
  text_muted: '--color-muted',
  accent: '--color-gold',
  accent_hover: '--color-gold-light',
  accent_text: '--color-accent-text',
  border: '--color-border',
  navbar_bg: '--color-header-bg',
  navbar_text: '--color-navbar-text',
  button_bg: '--color-gold',
  button_text: '--color-button-text',
  button_hover: '--color-gold-light',
  bg_card: '--color-card-bg',
  card_bg: '--color-card-bg',
  card_border: '--color-card-border',
  footer_bg: '--color-footer-bg',
  footer_text: '--color-footer-text',
};

export const metadata: Metadata = {
  title: {
    default: "ACEC — مكتب الميثاق العربي للاستشارات الهندسية",
    template: "%s | ACEC",
  },
  description:
    "مكتب الميثاق العربي للاستشارات الهندسية وهندسة السلامة — استشارات هندسية وهندسة سلامة متكاملة في المملكة العربية السعودية",
  keywords: [
    "استشارات هندسية",
    "هندسة السلامة",
    "تصميم معماري",
    "ACEC",
    "المملكة العربية السعودية",
    "engineering consultancy",
    "safety engineering",
    "Saudi Arabia",
  ],
  authors: [{ name: "ACEC" }],
  creator: "Arab Charter Engineering Consultants",
  metadataBase: new URL("https://ac-ec.com.sa"),
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://ac-ec.com.sa",
    siteName: "ACEC",
    title: "مكتب الميثاق العربي للاستشارات الهندسية وهندسة السلامة",
    description:
      "استشارات هندسية وهندسة سلامة متكاملة في المملكة العربية السعودية",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACEC — مكتب الميثاق العربي للاستشارات الهندسية",
  },
};

async function getActiveTheme() {
  try {
    const res = await fetch(`${API_BASE}/api/themes/active`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) return json.data;
    }
  } catch {
    // fallback to CSS defaults
  }
  return null;
}

function themeToCssVars(theme: any): string {
  if (!theme?.colors) return '';
  const colors = theme.colors as Record<string, string>;
  const raw = Object.entries(colors)
    .map(([key, value]) => `--${key.replace(/_/g, '-')}: ${value};`);

  Object.entries(colors).forEach(([key, value]) => {
    const colorVar = CSS_VAR_MAP[key];
    if (colorVar && colorVar !== `--${key.replace(/_/g, '-')}`) {
      raw.push(`${colorVar}: ${value};`);
    }
    raw.push(`${CSS_VAR_MAP[key] || `--${key.replace(/_/g, '-')}`}-rgb: ${hexToRgb(value)};`);
  });

  const accent = colors.accent || '#C9A84C';
  const accentRgb = hexToRgb(accent);
  const bg = colors.bg_primary || '#0D1B2A';
  const bgRgb = hexToRgb(bg);
  const text = colors.text_primary || '#F0F4F8';
  const textRgb = hexToRgb(text);
  const muted = colors.text_muted || '#8A9BB0';
  const secondary = colors.text_secondary || '#9AABBE';
  const surface = colors.bg_secondary || '#162234';
  const cardBg = colors.bg_card || '#162234';
  const border = colors.border || '#3A5068';
  const accentHover = colors.accent_hover || '#F0CF7A';
  const sectionAlt = colors.bg_section_alt || '#111E2C';
  const accentText = colors.accent_text || '#0D1B2A';

  raw.push(`--color-gold-dim: rgba(${accentRgb}, 0.15);`);
  raw.push(`--color-gold-dim-rgb: ${accentRgb};`);
  raw.push(`--color-border-gold: rgba(${accentRgb}, 0.25);`);
  raw.push(`--color-border-gold-rgb: ${accentRgb};`);
  raw.push(`--color-accent-rgb: ${accentRgb};`);
  raw.push(`--color-accent: ${accent};`);
  raw.push(`--color-header-bg: rgba(${bgRgb}, 0.85);`);
  raw.push(`--color-white: ${text};`);
  raw.push(`--color-white-rgb: ${textRgb};`);
  raw.push(`--color-accent-text: ${accentText};`);

  raw.push(`--color-text-on-dark: ${text};`);
  raw.push(`--color-text-on-dark-rgb: ${textRgb};`);
  raw.push(`--color-text-on-accent: ${accentText};`);
  raw.push(`--color-text-muted-on-dark: ${muted};`);
  raw.push(`--color-text-on-light: ${accentText};`);
  raw.push(`--color-text-muted-on-light: #4A5568;`);
  raw.push(`--color-secondary: ${secondary};`);
  raw.push(`--color-surface-2: ${sectionAlt};`);
  raw.push(`--color-surface-rgb: ${hexToRgb(surface)};`);
  raw.push(`--color-card-bg-rgb: ${hexToRgb(cardBg)};`);
  raw.push(`--color-border-rgb: ${hexToRgb(border)};`);
  raw.push(`--color-gold-light-rgb: ${hexToRgb(accentHover)};`);

  raw.push(`--font-heading: "Playfair Display", Georgia, serif;`);
  raw.push(`--font-body: "Inter", system-ui, Arial, sans-serif;`);
  raw.push(`--font-arabic: "Tajawal", "Cairo", Arial, sans-serif;`);
  raw.push(`--font-stat: "Bebas Neue", sans-serif;`);
  raw.push(`--font-mono: monospace;`);
  raw.push(`--radius-sm: 8px;`);
  raw.push(`--radius-md: 16px;`);
  raw.push(`--radius-lg: 24px;`);
  raw.push(`--radius-xl: 32px;`);

  return raw.join(' ');
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "ar";
  const dir = locale === "ar" ? "rtl" : "ltr";

  const theme = await getActiveTheme();
  const cssVars = theme ? themeToCssVars(theme) : '';

  return (
    <html lang={locale} dir={dir} data-theme={theme?.slug ?? 'dark-professional'} suppressHydrationWarning>
      <head>
        {cssVars && <style id="theme-vars">{`:root { ${cssVars} }`}</style>}
      </head>
      <body>{children}</body>
    </html>
  );
}
