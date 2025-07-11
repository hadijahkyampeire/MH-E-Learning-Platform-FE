import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import MHLogo from '../../components/ui/logo';
import LoginForm from './Login';

type Props = {
  onMenuToggle?: () => void;
};

const Header = ({ onMenuToggle }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={1}
      sx={{
        backgroundColor: theme.palette.background.paper,
        height: '70px',
        width: '100%',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderRadius: 0,
        '& .MuiAppBar-root': {
          borderRadius: 0,
        },
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 1.5,
          px: { xs: 1, sm: 2, md: 4 },
          minHeight: '70px',
          width: '100%',
          borderRadius: 0,
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="Open navigation menu"
              edge="start"
              onClick={onMenuToggle}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box
            sx={{
              minWidth: '120px',
              maxWidth: '200px',
              outline: 'none',
              '&:focus': {
                outline: 'none',
              },
              '&:focus-visible': {
                outline: 'none',
              },
            }}
            tabIndex={-1}
          >
            <MHLogo />
          </Box>
        </Box>

        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'flex-end',
            overflow: 'hidden',
          }}
        >
          <LoginForm />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
