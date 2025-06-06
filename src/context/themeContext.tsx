import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from '../theme/theme';

export interface Branding {
  mode?: 'light' | 'dark';
  primaryLightColor?: string;
  secondaryLightColor?: string;
  primaryDarkColor?: string;
  secondaryDarkColor?: string;
  font?: string;
}

const defaultBranding: Branding = {
 mode: 'light',
  primaryLightColor: '#64B5F6',
  secondaryLightColor: '#800000',
  primaryDarkColor: '#7986CB',
  secondaryDarkColor: '#DC143C',
  font: 'Roboto, sans-serif',
};

type ThemeContextProps = {
  darkMode: boolean;
  toggleTheme: () => void;
  branding: Branding;
  setBranding: (b: Branding) => void;
};

const ThemeContext = createContext<ThemeContextProps>({
  darkMode: false,
  toggleTheme: () => {},
  branding: defaultBranding,
  setBranding: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProviderWrapper');
  }
  return context;
};

export const ThemeProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [branding, setBranding] = useState<Branding>(defaultBranding);

  const toggleTheme = () => {
    console.log('called');
    setBranding((prev) => {
      const newMode = prev.mode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('themeMode', newMode);
      return {
        ...prev,
        mode: newMode,
      };
    });
  };

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as
      | 'light'
      | 'dark'
      | null;

    setBranding((prev) => ({
      ...prev,
      mode: savedMode || prev.mode,
    }));
  }, []);

  const theme = useMemo(() => getTheme(branding), [branding]);

  return (
    <ThemeContext.Provider
      value={{
        darkMode: branding.mode === 'dark',
        toggleTheme,
        branding,
        setBranding,
      }}
    >
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
