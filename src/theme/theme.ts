import { createTheme } from '@mui/material/styles';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTheme = (branding: any) =>
  createTheme({
    palette: {
      mode: branding?.mode || 'light',
      primary: {
        main: branding?.primaryColor || '#1976d2',
      },
      secondary: {
        main: branding?.secondaryColor || '#9c27b0',
      },
    },
    typography: {
      fontFamily: branding?.font || 'Roboto, sans-serif',
    },
  });
