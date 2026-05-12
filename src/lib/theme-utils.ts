import { ThemeColors } from './theme-types';

const KEY_MAP: Record<string, string> = {
  bg_primary: '--color-bg',
  bg_secondary: '--color-surface',
  bg_card: '--color-card-bg',
  bg_section_alt: '--color-surface-2',
  text_primary: '--color-text',
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
  card_bg: '--color-card-bg',
  card_border: '--color-card-border',
  footer_bg: '--color-footer-bg',
  footer_text: '--color-footer-text',
};

export function themeToCSS(colors: ThemeColors): string {
  return Object.entries(colors)
    .map(([key, value]) => `${KEY_MAP[key] || `--${key.replace(/_/g, '-')}`}: ${value};`)
    .join(' ');
}

export function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 0, 0';
}

export function applyThemeToDocument(colors: ThemeColors, slug?: string): void {
  const root = document.documentElement;
  Object.entries(colors).forEach(([key, value]) => {
    const cssVar = KEY_MAP[key] || `--${key.replace(/_/g, '-')}`;
    root.style.setProperty(cssVar, value);
    root.style.setProperty(`${cssVar}-rgb`, hexToRgb(value));
  });
  if (slug) root.setAttribute('data-theme', slug);
}
