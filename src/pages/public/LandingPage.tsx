import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useState } from 'react';
import Header from './LandingHeader';
import Sidebar from './LandingSideNav';
import Welcome from '../../components/Welcome';
import RequestResetPassword from './RequestPasswordReset';

export default function LandingPage() {
  const [selectedView, setSelectedView] = useState('welcome');
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Box display="flex" height="calc(100vh - 64px)">
        <Sidebar
          selected={selectedView}
          onSelect={setSelectedView}
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode(!darkMode)}
        />
        <Box
          flexGrow={1}
          p={3}
          minWidth="0"
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Box width="100%" maxWidth="1200px">
            {selectedView === 'welcome' && <Welcome />}
            {selectedView === 'reset' && <RequestResetPassword />}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
