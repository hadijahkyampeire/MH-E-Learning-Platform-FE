import { Box } from '@mui/material';
import DashboardHeader from '../../layouts/DashboardHeader';
import DashboardSidebar from '../../layouts/DashboardSidebar';
import { Outlet } from 'react-router-dom';

import SchoolIcon from '@mui/icons-material/School';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AssignmentIcon from '@mui/icons-material/Assignment';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import QuizIcon from '@mui/icons-material/Quiz';

const instructorSidebarItems = [
  {
    label: 'My Courses',
    path: '/instructor/courses',
    icon: <SchoolIcon />,
  },
  {
    label: 'Enroll Students',
    path: '/instructor/enroll',
    icon: <GroupAddIcon />,
  },
  {
    label: 'Assignments',
    path: '/instructor/assignments',
    icon: <AssignmentIcon />,
  },
  {
    label: 'Resources',
    path: '/instructor/resources',
    icon: <UploadFileIcon />,
  },
  {
    label: 'Quizzes',
    path: '/instructor/quizzes',
    icon: <QuizIcon />,
  },
];

const InstructorDashboard = () => {

  const handleChangePassword = () => {
    console.log('Redirect to change password');
  };

  return (
    <Box display="flex" height="100vh">
      <DashboardHeader
        onChangePassword={handleChangePassword}
      />
      <DashboardSidebar items={instructorSidebarItems} />
      <Box sx={{ marginLeft: '240px', marginTop: '64px', p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default InstructorDashboard;
