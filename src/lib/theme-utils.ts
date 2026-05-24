import { ThemeColors } from './theme-types';

export function generateThemeCssVars(colors: ThemeColors): string {
  return Object.entries(colors)
    .map(([key, value]) => `--color-${key}: ${value};`)
    .join(' ');
}

export function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 0, 0';
}

/**
 * Calculates and applies all application CSS variables derived from the 4 base colors.
 */
export function applyThemeToDocument(colors: ThemeColors, mode: 'light' | 'dark'): void {
  const root = document.documentElement;

  const isLight = mode === 'light';

  const textRgb = hexToRgb(colors.text);
  const bgRgb = hexToRgb(colors.background);

  // Set the 4 base colors
  root.style.setProperty('--color-background', colors.background);
  root.style.setProperty('--color-surface', colors.surface);
  root.style.setProperty('--color-accent', colors.accent);
  root.style.setProperty('--color-text-primary', colors.text);

  // Set RGB versions
  root.style.setProperty('--color-background-rgb', bgRgb);
  root.style.setProperty('--color-surface-rgb', hexToRgb(colors.surface));
  root.style.setProperty('--color-accent-rgb', hexToRgb(colors.accent));
  root.style.setProperty('--color-text-rgb', textRgb);

  // Glow opacities
  root.style.setProperty('--glow-opacity', isLight ? '0.01' : '0.15');
  root.style.setProperty('--glow-opacity-secondary', isLight ? '0.005' : '0.08');

  // Derived Backgrounds
  root.style.setProperty('--color-surface-alt', isLight ? '#D4CFC7' : `color-mix(in srgb, var(--color-background) 50%, var(--color-surface))`);
  root.style.setProperty('--color-card-bg', isLight ? '#F5F3F0' : '#363A3D');
  root.style.setProperty('--color-header-bg', isLight ? '#474A4D' : '#1E2022');
  root.style.setProperty('--color-footer-bg', isLight ? '#474A4D' : '#1E2022');

  // Derived Text Colors — enforce brand contrast
  root.style.setProperty('--color-text-secondary', isLight ? '#6B695A' : '#A8A69A');
  root.style.setProperty('--color-text-muted', isLight ? '#5A5850' : '#B8B4AC');
  root.style.setProperty('--color-header-text', '#F5F3F0');
  root.style.setProperty('--color-footer-text', isLight ? '#B8B4AC' : '#9A9589');

  // Derived Accents & Buttons
  root.style.setProperty('--color-accent-hover', isLight ? '#57564A' : '#7A7867');
  root.style.setProperty('--color-text-on-accent', isLight ? '#F5F3F0' : '#2C2E30');
  root.style.setProperty('--color-button-bg', isLight ? '#474A4D' : 'var(--color-accent)');
  root.style.setProperty('--color-button-text', isLight ? '#F5F3F0' : '#2C2E30');
  root.style.setProperty('--color-button-hover', isLight ? '#5A5D61' : '#7A7867');
  root.style.setProperty('--color-accent-dim', isLight ? 'rgba(107, 105, 90, 0.15)' : 'rgba(107, 105, 90, 0.25)');

  // Derived Borders — stronger in light mode
  root.style.setProperty('--color-border-default', isLight ? '#C8C2BA' : '#474A4D');
  root.style.setProperty('--color-card-border', isLight ? '#C8C2BA' : '#474A4D');

  // Brand tokens
  root.style.setProperty('--brand-dark', '#474A4D');
  root.style.setProperty('--brand-green', '#6B695A');
  root.style.setProperty('--brand-beige', '#D9D3CA');
  root.style.setProperty('--brand-beige-light', '#ECEAE6');
  root.style.setProperty('--brand-text-dark', '#2B2D2F');
  root.style.setProperty('--brand-text-muted', '#5A5850');
  root.style.setProperty('--brand-white', '#F5F3F0');

  // Backward-compatible aliases
  root.style.setProperty('--color-gold', 'var(--color-accent)');
  root.style.setProperty('--color-gold-rgb', 'var(--color-accent-rgb)');
  root.style.setProperty('--color-gold-dim', 'var(--color-accent-dim)');
  root.style.setProperty('--color-gold-light', 'var(--color-accent-hover)');
  root.style.setProperty('--color-border-gold', 'var(--color-accent)');
  root.style.setProperty('--color-muted', 'var(--color-text-muted)');
  root.style.setProperty('--color-white', '#F5F3F0');
  root.style.setProperty('--color-text', 'var(--color-text-primary)');
  root.style.setProperty('--color-bg-rgb', 'var(--color-background-rgb)');
  root.style.setProperty('--color-bg', 'var(--color-background)');
  root.style.setProperty('--color-border', 'var(--color-border-default)');
  root.style.setProperty('--accent', 'var(--color-accent)');
}
