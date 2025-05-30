import { getTheme } from './theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useMemo } from 'react';

export const ThemeProviderWrapper = ({ children, branding }: any) => {
  const theme = useMemo(() => getTheme(branding), [branding]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};