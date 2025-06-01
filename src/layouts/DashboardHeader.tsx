import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyIcon from '@mui/icons-material/VpnKey';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchOrganizations } from '../store/slices/organizationSlice';
import { logout } from '../store/slices/authSlice';
import { useTheme } from '@mui/material/styles';
import MHLogo from '../components/ui/logo';

type Props = {
  onChangePassword: () => void;
};

const DashboardHeader = ({ onChangePassword }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const user = useAppSelector((state) => state.auth.user);
  const { organizations } = useAppSelector((state) => state.organizations);

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

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchOrganizations());
    };
    fetchData();
  }, [dispatch]);

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
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center" justifyItems='center' gap={1}>
          <MHLogo />
          <Typography
            color="secondary"
            sx={{ fontFamily: theme.typography.fontFamily, fontWeight: 700, fontSize: '1.15rem' }}
          >
            - {institutionName}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography color='white'>{username}</Typography>
          <IconButton onClick={handleMenu}>
            <Avatar>{username[0]}</Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                onChangePassword();
                handleClose();
              }}
            >
              <KeyIcon fontSize="small" sx={{ mr: 1 }} /> Change Password
            </MenuItem>
            <MenuItem
              onClick={() => {
                onLogout();
                handleClose();
              }}
            >
              <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;
