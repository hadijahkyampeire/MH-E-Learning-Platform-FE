import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyIcon from '@mui/icons-material/VpnKey';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { useGetOrganizationsQuery } from '../services/organizationsApi';
import { logout } from '../store/slices/authSlice';
import MHLogo from '../components/ui/logo';
import { useNotification } from '../context/NotificationProvider';

type Props = {
  onChangePassword: () => void;
  onMenuToggle?: () => void;
};

const DashboardHeader = ({ onChangePassword, onMenuToggle }: Props) => {
  const { showNotification } = useNotification();
  const { data: organizations = [] } = useGetOrganizationsQuery();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const user = useAppSelector((state) => state.auth.user);

  const onLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const prefix = user?.email?.split('@')[0] || '';
  const name = prefix.charAt(0).toUpperCase() + prefix.slice(1);

  const username = name || 'User';
  const organization = organizations.find(
    (org) => org.id === user?.organization_id
  );
  const institutionName = organization?.name || 'Institution';

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={1}
      sx={{
        height: '64px',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main),
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          px: { xs: 1, sm: 2, md: 3 },
          minHeight: '64px',
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

          <MHLogo />

          {!isSmallScreen && (
            <Typography
              color="secondary"
              sx={{
                fontFamily: theme.typography.fontFamily,
                fontWeight: 700,
                fontSize: { xs: '1rem', sm: '1.15rem' },
                display: { xs: 'none', sm: 'block' },
              }}
            >
              - {institutionName}
            </Typography>
          )}
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          {!isSmallScreen && (
            <Typography
              color="white"
              sx={{
                fontSize: { xs: '0.875rem', sm: '1rem' },
                display: { xs: 'none', sm: 'block' },
              }}
            >
              {username}
            </Typography>
          )}

          <IconButton
            onClick={handleMenu}
            aria-label={`User menu for ${username}`}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl)}
          >
            <Avatar
              sx={{
                width: { xs: 32, sm: 36 },
                height: { xs: 32, sm: 36 },
                fontSize: { xs: '0.875rem', sm: '1rem' },
              }}
            >
              {username[0]}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: '200px',
              },
            }}
          >
            <MenuItem
              onClick={() => {
                onChangePassword();
                handleClose();
              }}
              sx={{ py: 1.5 }}
            >
              <KeyIcon fontSize="small" sx={{ mr: 1.5 }} />
              Change Password
            </MenuItem>
            <MenuItem
              onClick={() => {
                onLogout();
                handleClose();
                showNotification('Logout successful', 'info');
              }}
              sx={{ py: 1.5 }}
            >
              <LogoutIcon fontSize="small" sx={{ mr: 1.5 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;
