import { AppBar, Toolbar, Box } from '@mui/material';
import LoginForm from './Login';
import MHLogo from '../../components/ui/logo';
import { useTheme } from '@mui/material/styles';

const Header = () => {
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{ backgroundColor: theme.palette.background.paper, height: '70px' }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 1.5,
          px: { xs: 2, sm: 4 },
        }}
      >
        <Box display="flex" alignItems="center" width="200px">
          <MHLogo />
        </Box>
        <LoginForm />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
