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
  const accentHex = colors.accent || '#C9A84C';
  const accentRgb = hexToRgb(accentHex);
  const bgHex = colors.bg_primary || '#0D1B2A';
  const bgRgb = hexToRgb(bgHex);
  const textHex = colors.text_primary || '#F0F4F8';
  const textRgb = hexToRgb(textHex);
  const mutedHex = colors.text_muted || '#8A9BB0';
  const secondaryHex = colors.text_secondary || '#9AABBE';
  const surfaceHex = colors.bg_secondary || '#162234';
  const cardBgHex = colors.bg_card || '#162234';
  const borderHex = colors.border || '#3A5068';
  const accentHoverHex = colors.accent_hover || '#F0CF7A';
  const sectionAltHex = colors.bg_section_alt || '#111E2C';
  const accentTextHex = colors.accent_text || '#0D1B2A';

  root.style.setProperty('--color-gold-dim', `rgba(${accentRgb}, 0.15)`);
  root.style.setProperty('--color-gold-dim-rgb', accentRgb);
  root.style.setProperty('--color-border-gold', `rgba(${accentRgb}, 0.25)`);
  root.style.setProperty('--color-border-gold-rgb', accentRgb);
  root.style.setProperty('--color-accent-rgb', accentRgb);
  root.style.setProperty('--color-accent', accentHex);
  root.style.setProperty('--color-header-bg', `rgba(${bgRgb}, 0.85)`);
  root.style.setProperty('--color-white', textHex);
  root.style.setProperty('--color-white-rgb', textRgb);
  root.style.setProperty('--color-accent-text', accentTextHex);

  root.style.setProperty('--color-text-on-dark', textHex);
  root.style.setProperty('--color-text-on-dark-rgb', textRgb);
  root.style.setProperty('--color-text-on-accent', accentTextHex);
  root.style.setProperty('--color-text-muted-on-dark', mutedHex);
  root.style.setProperty('--color-text-on-light', accentTextHex);
  root.style.setProperty('--color-text-muted-on-light', '#4A5568');
  root.style.setProperty('--color-secondary', secondaryHex);
  root.style.setProperty('--color-surface-2', sectionAltHex);
  root.style.setProperty('--color-surface-rgb', hexToRgb(surfaceHex));
  root.style.setProperty('--color-card-bg-rgb', hexToRgb(cardBgHex));
  root.style.setProperty('--color-border-rgb', hexToRgb(borderHex));
  root.style.setProperty('--color-gold-light-rgb', hexToRgb(accentHoverHex));

  root.style.setProperty('--font-heading', '"Playfair Display", Georgia, serif');
  root.style.setProperty('--font-body', '"Inter", system-ui, Arial, sans-serif');
  root.style.setProperty('--font-arabic', '"Tajawal", "Cairo", Arial, sans-serif');
  root.style.setProperty('--font-stat', '"Bebas Neue", sans-serif');
  root.style.setProperty('--font-mono', 'monospace');
  root.style.setProperty('--radius-sm', '8px');
  root.style.setProperty('--radius-md', '16px');
  root.style.setProperty('--radius-lg', '24px');
  root.style.setProperty('--radius-xl', '32px');
  if (slug) root.setAttribute('data-theme', slug);
}
