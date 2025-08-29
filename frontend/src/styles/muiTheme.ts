import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    primary: {
      main: "#0070f3",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#9c27b0",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
    success: { main: "#28a745" },
    warning: { main: "#ff9800" },
    error: { main: "#dc3545" },
    divider: "#2c2c2c",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#2c2c2c",
          borderRadius: "8px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#2c2c2c",
          "& fieldset": {
            borderColor: "#2c2c2c",
          },
          "&:hover fieldset": {
            borderColor: "#0070f3",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#0070f3",
            boxShadow: "0 0 0 2px rgba(0, 112, 243, 0.3)",
          },
        },
        input: {
          color: "#ffffff",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 600,
          padding: "0.5rem 1rem",
          boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
        },
      },
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    body1: { fontSize: "1rem" },
    body2: { fontSize: "0.875rem" },
  },
});
