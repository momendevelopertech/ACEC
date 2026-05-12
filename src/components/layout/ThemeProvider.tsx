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

    const bg = colors.bg_primary || '';
    if (bg) {
      root.style.setProperty('--color-gold-dim', `rgba(${hexToRgb(colors.accent || '#C9A84C')}, 0.15)`);
      root.style.setProperty('--color-border-gold', `rgba(${hexToRgb(colors.accent || '#C9A84C')}, 0.25)`);
    }

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
