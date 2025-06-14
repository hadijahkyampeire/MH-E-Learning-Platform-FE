import DashboardHeader from '../../layouts/DashboardHeader';
import DashboardSidebar from '../../layouts/DashboardSidebar';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import DomainIcon from '@mui/icons-material/Domain';
import DashboardIcon from '@mui/icons-material/Dashboard';

const sidebarItems = [
  { label: 'Overview', path: '/dashboard/overview', icon: <DashboardIcon /> },  
  { label: 'Organizations', path: '/dashboard/organizations', icon: <DomainIcon /> },
  { label: 'All Users', path: '/dashboard/users', icon: <PeopleIcon /> },
  {
    label: 'Courses/Programs',
    path: '/dashboard/courses',
    icon: <SchoolIcon />,
  },
];

const SuperAdminDashboard = () => {
  const handleChangePassword = () => {
    console.log('Redirect to change password');
  };

  const headerHeight = 64;
  const sidebarWidth = 240;

  return (
    <>
      <DashboardHeader onChangePassword={handleChangePassword} />
      <DashboardSidebar items={sidebarItems} />
      <Box
        sx={{
          ml: `${sidebarWidth}px`,
          mt: `${headerHeight}px`,
          p: 3,
          height: `calc(100vh - ${headerHeight}px)`,
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default SuperAdminDashboard;
