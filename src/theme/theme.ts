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
    },
    components: {
      MuiButton: {
        styleOverrides: {
          containedPrimary: {
            backgroundColor: primary,
            '&:hover': {
              backgroundColor: darken(primary, 0.1),
            },
          },
          root: {
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
    },
  });
};
