'use client';

import { ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { GlobalStyles } from "@/styles/GlobalStyles";
import { theme } from "@/styles/theme";
import { muiTheme } from "@/styles/muiTheme";
import { UserProvider } from "@/contexts/UserContext";
import { TaskProvider } from "@/contexts/TaskContext";

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <MuiThemeProvider theme={muiTheme}>
      {/*Reset global do Material UI*/}
      <CssBaseline />

      {/*Theme do styled-components*/}
      <StyledThemeProvider theme={theme}>
        <GlobalStyles />

        {/*Contextos globais*/}
        <UserProvider>
          <TaskProvider>{children}</TaskProvider>
        </UserProvider>
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
}
