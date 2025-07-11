import DashboardHeader from '../../layouts/DashboardHeader';
import DashboardSidebar from '../../layouts/DashboardSidebar';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import DomainIcon from '@mui/icons-material/Domain';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useMobileNavigation, useResponsive } from '../../hooks/useResponsive';

const sidebarItems = [
  { label: 'Overview', path: '/dashboard/overview', icon: <DashboardIcon /> },
  {
    label: 'Organizations',
    path: '/dashboard/organizations',
    icon: <DomainIcon />,
  },
  { label: 'All Users', path: '/dashboard/users', icon: <PeopleIcon /> },
  {
    label: 'Courses/Programs',
    path: '/dashboard/courses',
    icon: <SchoolIcon />,
  },
];

const SuperAdminDashboard = () => {
  const { mobileOpen, handleDrawerToggle } =
    useMobileNavigation();
  const { isMobile } = useResponsive();

  const handleChangePassword = () => {
    console.log('Redirect to change password');
  };

  const headerHeight = 64;
  const sidebarWidth = isMobile ? 200 : 240;

  return (
    <Box>
      <DashboardHeader
        onChangePassword={handleChangePassword}
        onMenuToggle={handleDrawerToggle}
      />
      <DashboardSidebar
        items={sidebarItems}
        width={sidebarWidth}
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
      />
      <Box
        sx={{
          ml: { xs: 0, md: `${sidebarWidth}px` },
          mt: `${headerHeight}px`,
          p: { xs: 2, sm: 3 },
          height: `calc(100vh - ${headerHeight}px)`,
          overflowY: 'auto',
          position: 'relative',
          backgroundColor: 'background.default',
        }}
      >
        <Box
          sx={{
            maxWidth: '1200px',
            mx: 'auto',
            width: '100%',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default SuperAdminDashboard;
