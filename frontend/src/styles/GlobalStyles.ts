'use client';

import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  /* Reset básico */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    font-family: ${({ theme }) => theme.fonts.body};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primaryHover};
      text-decoration: underline;
    }
  }

  ul, ol {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
    transition: background-color 0.2s ease, transform 0.1s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryHover};
    }

    &:active {
      transform: scale(0.97);
    }

    &:disabled {
      background-color: ${({ theme }) => theme.colors.border};
      color: ${({ theme }) => theme.colors.text};
      cursor: not-allowed;
    }
  }

  input, textarea, select {
    font-family: inherit;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius};
    background-color: ${({ theme }) => theme.colors.inputBg};
    color: ${({ theme }) => theme.colors.text};
    padding: 0.5rem;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &::placeholder {
      color: ${({ theme }) => theme.colors.textSecondary};
    }

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.3);
    }
  }

  /* Estilo para cards */
  .card {
    background-color: ${({ theme }) => theme.colors.cardBg};
    border-radius: ${({ theme }) => theme.borderRadius};
    box-shadow: ${({ theme }) => theme.shadows.sm};
    padding: ${({ theme }) => theme.spacing.md};
  }
`;
