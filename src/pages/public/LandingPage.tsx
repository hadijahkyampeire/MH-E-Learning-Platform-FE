import { Box, Drawer, useTheme, useMediaQuery } from '@mui/material';
import { useState, useEffect } from 'react';
import Header from './LandingHeader';
import Sidebar from './LandingSideNav';
import Welcome from '../../components/Welcome';
import Features from '../../components/Features';
import RequestResetPassword from './RequestPasswordReset';
import LoginForm from './Login';
import { useThemeContext } from '../../context/themeContext';

export default function LandingPage() {
  const [selectedView, setSelectedView] = useState('welcome');
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { darkMode, toggleTheme } = useThemeContext();

  useEffect(() => {
    console.log('LandingPage component mounted');
    console.log('Current selectedView:', selectedView);
  }, [selectedView]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleViewSelect = (view: string) => {
    console.log('View selected:', view);
    setSelectedView(view);
    setMobileOpen(false); // Close mobile drawer after selection
  };

  console.log('LandingPage rendering with selectedView:', selectedView);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Header onMenuToggle={handleDrawerToggle} />

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: '280px',
            top: '70px',
            height: 'calc(100vh - 70px)',
            backgroundColor: 'background.paper',
            borderRight: '1px solid',
            borderColor: 'divider',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: '8px',
          },
        }}
      >
        <Sidebar
          selected={selectedView}
          onSelect={handleViewSelect}
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
        />
      </Drawer>

      <Box
        sx={{
          display: 'flex',
          height: 'calc(100vh - 70px)',
          mt: '70px', // Account for fixed header
        }}
      >
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            width: '250px',
            flexShrink: 0,
            backgroundColor: 'background.paper',
            borderRight: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Sidebar
            selected={selectedView}
            onSelect={setSelectedView}
            darkMode={darkMode}
            onToggleTheme={toggleTheme}
          />
        </Box>

        <Box
          flexGrow={1}
          p={{ xs: 2, sm: 3 }}
          minWidth="0"
          display="flex"
          flexDirection="column"
          sx={{
            backgroundColor: 'background.default',
            overflowY: 'auto',
          }}
        >
          {isMobile && (
            <Box
              sx={{
                mb: 3,
                p: 2,
                backgroundColor: 'background.paper',
                borderRadius: 1,
              }}
            >
              <LoginForm />
            </Box>
          )}

          <Box width="100%" maxWidth="1200px" flexGrow={1}>
            {selectedView === 'welcome' && <Welcome />}
            {selectedView === 'features' && <Features />}
            {selectedView === 'reset' && <RequestResetPassword />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
