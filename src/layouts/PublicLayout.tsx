import { AppBar, Toolbar, Container, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import MHLogo from '../components/ui/logo';

const PublicLayout = () => {
  return (
    <>
      <AppBar 
        position="static" 
        color="default" 
        elevation={0}
        sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          <MHLogo />
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default PublicLayout;
