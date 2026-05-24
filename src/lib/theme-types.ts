export interface ThemeColors {
  background: string;
  surface: string;
  accent: string;
  text: string;
}

export interface Theme {
  id: number;
  name: string;
  name_ar: string;
  slug: string;
  is_active: boolean;
  colors: ThemeColors;
  typography?: Record<string, string>;
  layout?: Record<string, string>;
}

export const DEFAULT_THEME_COLORS: ThemeColors = {
  background: '#D9D3CA',
  surface: '#E8E4DE',
  accent: '#6B695A',
  text: '#474A4D',
};
