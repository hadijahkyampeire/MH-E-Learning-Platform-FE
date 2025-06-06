import { Box, AppBar, Toolbar, Button } from '@mui/material';
import { Outlet } from 'react-router-dom';
import MHLogo from '../components/ui/logo';

const PrivateLayout = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <MHLogo />
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      <Box p={3}>
        <Outlet />
      </Box>
    </>
  );
};

export default PrivateLayout;
