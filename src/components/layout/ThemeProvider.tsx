"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Theme } from "@/lib/theme-types";
import { hexToRgb } from "@/lib/theme-utils";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

const KEY_MAP: Record<string, string> = {
  bg_primary: '--color-bg',
  bg_secondary: '--color-surface',
  bg_card: '--color-card-bg',
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
  card_bg: '--color-card-bg',
  card_border: '--color-card-border',
  footer_bg: '--color-footer-bg',
  footer_text: '--color-footer-text',
};

interface ThemeContextType {
  theme: Theme | null;
  switchTheme: (themeId: number) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: null,
  switchTheme: async () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  const applyThemeColors = useCallback((t: Theme) => {
    if (!t?.colors) return;
    const root = document.documentElement;
    const colors = t.colors as unknown as Record<string, string>;

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

    root.setAttribute('data-theme', t.slug);
  }, []);

  useEffect(() => {
    const existingVars = document.getElementById('theme-vars');
    if (existingVars) return;

    async function fetchTheme() {
      try {
        const res = await fetch(`${API_BASE}/api/themes/active`, {
          next: { revalidate: 60 },
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setTheme(json.data);
            applyThemeColors(json.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch theme:", error);
      }
    }
    fetchTheme();
  }, [applyThemeColors]);

  const switchTheme = async (themeId: number) => {
    try {
      const res = await fetch(`${API_BASE}/api/themes/${themeId}/activate`, {
        method: 'POST',
      });
      if (res.ok) {
        const activeRes = await fetch(`${API_BASE}/api/themes/active`);
        if (activeRes.ok) {
          const json = await activeRes.json();
          if (json.success && json.data) {
            setTheme(json.data);
            applyThemeColors(json.data);
          }
        }
      }
    } catch (error) {
      console.error("Failed to switch theme:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
