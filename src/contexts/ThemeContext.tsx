import React, { createContext, useState, useContext, useMemo, ReactNode } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

type ThemeContextType = {
  mode: PaletteMode;
  toggleColorMode: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [mode, setMode] = useState<PaletteMode>('light');

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#2196f3',
          },
          secondary: {
            main: '#00bcd4',
          },
          error: {
            main: '#f44336',
          },
          warning: {
            main: '#ffca28',
          },
          info: {
            main: '#29b6f6',
          },
          success: {
            main: '#4caf50',
          },
        },
        typography: {
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
          ].join(','),
          h1: {
            fontWeight: 700,
            lineHeight: 1.2,
          },
          h2: {
            fontWeight: 700,
            lineHeight: 1.2,
          },
          h3: {
            fontWeight: 600,
            lineHeight: 1.2,
          },
          h4: {
            fontWeight: 600,
            lineHeight: 1.2,
          },
          body1: {
            lineHeight: 1.5,
          },
          body2: {
            lineHeight: 1.5,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                transition: 'all 0.3s ease',
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                marginBottom: 16,
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};