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
  secondaryLightColor: '#FFA726',
  primaryDarkColor: '#7986CB',
  secondaryDarkColor: '#FF8A65',
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
export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [branding, setBranding] = useState<Branding>(defaultBranding);

  const toggleTheme = () => {
    setBranding((prev) => ({
      ...prev,
      mode: prev.mode === 'dark' ? 'light' : 'dark',
    }));
  };

  useEffect(() => {
    const fetchBranding = async () => {
      // Replace with real fetch if needed
      setBranding(defaultBranding);
    };
    fetchBranding();
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
