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

  return (
    <Box>
      <DashboardHeader
        onChangePassword={handleChangePassword}
      />
      <DashboardSidebar items={sidebarItems} />
      <Box sx={{ marginLeft: '240px', px: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
export default AdminDashboard;
