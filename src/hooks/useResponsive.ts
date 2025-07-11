import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

export const useResponsive = () => {
  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return {
    isMobile,
    isTablet,
    isDesktop,
    isSmallScreen,
  };
};

export const useMobileNavigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isMobile } = useResponsive();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  // Close mobile drawer when screen size changes
  useEffect(() => {
    if (!isMobile) {
      setMobileOpen(false);
    }
  }, [isMobile]);

  return {
    mobileOpen,
    handleDrawerToggle,
    handleDrawerClose,
  };
}; 