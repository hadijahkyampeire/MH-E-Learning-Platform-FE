import DashboardHeader from '../../layouts/DashboardHeader';
import DashboardSidebar from '../../layouts/DashboardSidebar';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';

const sidebarItems = [
  {
    label: 'All Users',
    path: '/admin/users',
    icon: <PeopleIcon />,
  },
  {
    label: 'Courses',
    path: '/admin/courses',
    icon: <SchoolIcon />,
  },
];

const AdminDashboard = () => {

  const handleChangePassword = () => {
    console.log('Redirect to change password');
  };

  const headerHeight = 64;
  const sidebarWidth = 240;
  return (
    <>
      <DashboardHeader
        onChangePassword={handleChangePassword}
      />
      <DashboardSidebar items={sidebarItems} />
      <Box sx={{
          ml: `${sidebarWidth}px`,
          mt: `${headerHeight}px`,
          p: 3,
          height: `calc(100vh - ${headerHeight}px)`,
          overflowY: 'auto',
          position: 'relative',
        }}>
        <Outlet />
      </Box>
    </>
  );
};
export default AdminDashboard;
