import { createTheme } from '@mui/material/styles';
import { darken } from '@mui/material';

import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom?: {
      activeMenu: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      activeMenu: string;
    };
  }
}

export interface Branding {
  mode?: 'light' | 'dark';
  primaryLightColor?: string;
  secondaryLightColor?: string;
  primaryDarkColor?: string;
  secondaryDarkColor?: string;
  font?: string;
}

// Default colors
const defaultLight = {
  primary: '#64B5F6',  
  secondary: '#800000', 
};

const defaultDark = {
  primary: '#7986CB',  
  secondary: '#DC143C',  
};

// Responsive breakpoints
const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

export const getTheme = (branding: Branding = {}) => {
  const mode = branding.mode || 'light';
  const isDark = mode === 'dark';

  const primary = isDark
    ? branding.primaryDarkColor || defaultDark.primary
    : branding.primaryLightColor || defaultLight.primary;

  const secondary = isDark
    ? branding.secondaryDarkColor || defaultDark.secondary
    : branding.secondaryLightColor || defaultLight.secondary;

    const activeMenuColor = isDark
    ? darken(primary, 0.3)
    : '#E3F2FD';

  return createTheme({
    breakpoints: {
      values: breakpoints,
    },
    palette: {
      mode,
      primary: { main: primary },
      secondary: { main: secondary },
      background: {
        default: isDark ? '#121212' : '#FFFFFF',
        paper: isDark ? '#1E1E1E' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#FFFFFF' : '#212121',
        secondary: isDark ? '#BDBDBD' : '#616161',
      },
      ...(branding && {
        custom: {
          activeMenu: activeMenuColor,
        },
      }),
    } as any,
    typography: {
      fontFamily: branding.font || 'Roboto, sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
        lineHeight: 1.2,
        [`@media (max-width:${breakpoints.md}px)`]: {
          fontSize: '2rem',
        },
        [`@media (max-width:${breakpoints.sm}px)`]: {
          fontSize: '1.75rem',
        },
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.3,
        [`@media (max-width:${breakpoints.md}px)`]: {
          fontSize: '1.75rem',
        },
        [`@media (max-width:${breakpoints.sm}px)`]: {
          fontSize: '1.5rem',
        },
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.3,
        [`@media (max-width:${breakpoints.md}px)`]: {
          fontSize: '1.5rem',
        },
        [`@media (max-width:${breakpoints.sm}px)`]: {
          fontSize: '1.25rem',
        },
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
        [`@media (max-width:${breakpoints.md}px)`]: {
          fontSize: '1.25rem',
        },
        [`@media (max-width:${breakpoints.sm}px)`]: {
          fontSize: '1.125rem',
          
        },
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
        [`@media (max-width:${breakpoints.sm}px)`]: {
          fontSize: '1.125rem',
        },
      },
      h6: {
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: 1.4,
        [`@media (max-width:${breakpoints.sm}px)`]: {
          fontSize: '1rem',
        },
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
        [`@media (max-width:${breakpoints.sm}px)`]: {
          fontSize: '0.9375rem',
        },
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
        [`@media (max-width:${breakpoints.sm}px)`]: {
          fontSize: '0.8125rem',
        },
      },
      button: {
        fontSize: '0.875rem',
        fontWeight: 500,
        textTransform: 'none',
        [`@media (max-width:${breakpoints.sm}px)`]: {
          fontSize: '0.8125rem',
        },
      },
    },
    spacing: (factor: number) => `${0.25 * factor}rem`,
    components: {
      MuiButton: {
        styleOverrides: {
          containedPrimary: {
            backgroundColor: primary,
            '&:hover': {
              backgroundColor: darken(primary, 0.1),
            },
            '&:focus-visible': {
              outline: `2px solid ${primary}`,
              outlineOffset: '2px',
            },
          },
          root: {
            textTransform: 'none',
            fontWeight: 500,
            borderRadius: '4px',
            padding: '8px 16px',
            minHeight: '40px',
            [`@media (max-width:${breakpoints.sm}px)`]: {
              padding: '6px 12px',
              minHeight: '36px',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '4px',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            boxShadow: isDark 
              ? '0 2px 8px rgba(0, 0, 0, 0.3)' 
              : '0 2px 8px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: `1px solid ${isDark ? '#333' : '#e0e0e0'}`,
            borderRadius: 0,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: isDark 
              ? '0 1px 4px rgba(0, 0, 0, 0.3)' 
              : '0 1px 4px rgba(0, 0, 0, 0.1)',
            borderRadius: 0,
          },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            '& .MuiTableCell-root': {
              padding: '12px 16px',
              [`@media (max-width: ${breakpoints.sm}px)`]: {
                padding: '8px 12px',
              },
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: '12px',
            [`@media (max-width:${breakpoints.sm}px)`]: {
              margin: '16px',
              maxWidth: 'calc(100vw - 32px)',
            },
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            borderRadius: '8px',
            boxShadow: isDark 
              ? '0 4px 12px rgba(0, 0, 0, 0.4)' 
              : '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: '4px',
            margin: '2px 8px',
            '&:focus-visible': {
              outline: `2px solid ${primary}`,
              outlineOffset: '2px',
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&:focus-visible': {
              outline: `2px solid ${primary}`,
              outlineOffset: '2px',
            },
          },
        },
      },
    },
  });
};
