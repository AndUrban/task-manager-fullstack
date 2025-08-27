import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    primary: "#0070f3",
    primaryHover: "#0059c1",
    secondary: "#9c27b0",
    success: "#28a745",
    warning: "#ff9800",
    danger: "#dc3545",

    background: "#121212",
    cardBg: "#1e1e1e",
    inputBg: "#2c2c2c",

    text: "#ffffff",
    textSecondary: "#b0b0b0",

    tableHeader: "#1f1f1f",
    border: "#2c2c2c",
  },
  fonts: {
    body: `'Inter', sans-serif`,
    heading: `'Roboto Slab', serif`,
    mono: `'Roboto Mono', monospace`,
  },
  fontSizes: {
    sm: "0.875rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.5rem",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "2rem",
  },
  borderRadius: "8px",
  shadows: {
    sm: "0 2px 4px rgba(0, 0, 0, 0.3)",
    md: "0 4px 8px rgba(0, 0, 0, 0.5)",
  },
};
