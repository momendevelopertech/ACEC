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
  background: '#FAFAFA',
  surface: '#FFFFFF',
  accent: '#8A6B24',
  text: '#111827',
};
