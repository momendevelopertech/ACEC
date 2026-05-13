export interface ThemeColors {
  bg_primary: string;
  bg_secondary: string;
  bg_card: string;
  bg_section_alt: string;
  text_primary: string;
  text_secondary: string;
  text_muted: string;
  accent: string;
  accent_hover: string;
  accent_text: string;
  border: string;
  navbar_bg: string;
  navbar_text: string;
  button_bg: string;
  button_text: string;
  button_hover: string;
  card_bg: string;
  card_border: string;
  footer_bg: string;
  footer_text: string;
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
  bg_primary: '#0D1B2A',
  bg_secondary: '#162234',
  bg_card: '#162234',
  bg_section_alt: '#111E2C',
  text_primary: '#F0F4F8',
  text_secondary: '#9AABBE',
  text_muted: '#8A9BB0',
  accent: '#C9A84C',
  accent_hover: '#F0CF7A',
  accent_text: '#0D1B2A',
  border: '#3A5068',
  navbar_bg: '#162234',
  navbar_text: '#F0F4F8',
  button_bg: '#C9A84C',
  button_text: '#0D1B2A',
  button_hover: '#F0CF7A',
  card_bg: '#162234',
  card_border: '#3A5068',
  footer_bg: '#080D14',
  footer_text: '#8A9BB0',
};
