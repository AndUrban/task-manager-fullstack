import 'styled-components';
import { theme } from './theme';

type ThemeType = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {
    colors: {
      primary: string;
      primaryHover: string;
      secondary: string;
      success: string;
      warning: string;
      danger: string;
      background: string;
      cardBg: string;
      inputBg: string;
      text: string;
      textSecondary: string;
      tableHeader: string;
      border: string;
    };
    fonts: {
      body: string;
      heading: string;
      mono: string;
    };
    fontSizes: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
    };
    borderRadius: string;
    shadows: {
      sm: string;
      md: string;
    };
  }
}
