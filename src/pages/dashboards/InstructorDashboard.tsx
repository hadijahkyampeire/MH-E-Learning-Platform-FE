import { Box } from '@mui/material';
import DashboardHeader from '../../layouts/DashboardHeader';
import DashboardSidebar from '../../layouts/DashboardSidebar';
import { Outlet } from 'react-router-dom';

import SchoolIcon from '@mui/icons-material/School';
import DashboardIcon from '@mui/icons-material/Dashboard';

const instructorSidebarItems = [
  { label: 'Overview', path: '/instructor/overview', icon: <DashboardIcon /> },
  {
    label: 'My Courses',
    path: '/instructor/courses',
    icon: <SchoolIcon />,
  },
];

const InstructorDashboard = () => {
  const handleChangePassword = () => {
    console.log('Redirect to change password');
  };

  const headerHeight = 64;
  const sidebarWidth = 240;
  return (
    <>
      <DashboardHeader onChangePassword={handleChangePassword} />
      <DashboardSidebar items={instructorSidebarItems} />
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

export default InstructorDashboard;
