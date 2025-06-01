import { getTheme, type Branding } from './theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

const branding: Branding = {
  mode: 'light',
  primaryLightColor: '#64B5F6',
  secondaryLightColor: '#800000',
  primaryDarkColor: '#7986CB',
  secondaryDarkColor: '#DC143C',
  font: 'Roboto, sans-serif',
};

export const ThemeProviderWrapper = ({ children }: any) => {
  const [brandingState, setBrandingState] = useState<Branding>(branding);

  useEffect(() => {
    // Simulate fetching branding from an API or context
    const fetchBranding = async () => {
      // Here you would typically fetch the branding from an API or context
      // For this example, we will use the static branding defined above
      setBrandingState(branding);
    };
    fetchBranding();
  }, []);

  const theme = useMemo(() => getTheme(brandingState), [brandingState]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};