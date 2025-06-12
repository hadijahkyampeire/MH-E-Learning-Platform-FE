import { Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/MenuBook';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import GradeIcon from '@mui/icons-material/Grade';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Outlet } from 'react-router-dom';
import DashboardHeader from '../../layouts/DashboardHeader';
import DashboardSidebar from '../../layouts/DashboardSidebar';
import { useGetCoursesQuery } from '../../services/coursesApi';

const StudentDashboard = () => {
  const { data: allCourses = [] } = useGetCoursesQuery();

  if (allCourses.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <h2>No active courses found</h2>
        <p>Please enroll in a course to access the dashboard.</p>
      </Box>
    );
  }

  const sidebarItems = [
    {
      label: 'Overview',
      path: '/student/overview',
      icon: <DashboardIcon />,
    },
    {
      label: 'Profile',
      path: '/student/profile',
      icon: <AccountCircleIcon />,
    },
    ...allCourses.map((course) => ({
      label: course.name,
      icon: <SchoolIcon />,
      children: [
        {
          label: 'Overview',
          path: `/student/courses/${course.id}/overview`,
          icon: <BookIcon />,
        },
        {
          label: 'Resources',
          path: `/student/courses/${course.id}/resources`,
          icon: <BookIcon />,
        },
        {
          label: 'Assignments',
          path: `/student/courses/${course.id}/assignments`,
          icon: <AssignmentIcon />,
        },
        {
          label: 'Quizzes',
          path: `/student/courses/${course.id}/quizzes`,
          icon: <QuizIcon />,
        },
        {
          label: 'Grades',
          path: `/student/courses/${course.id}/grades`,
          icon: <GradeIcon />,
        },
      ],
    })),
  ];

  const handleChangePassword = () => {
    console.log('Redirect to change password');
    // navigate('/change-password')
  };

  const headerHeight = 64;
  const sidebarWidth = 240;
  return (
    <Box>
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
    </Box>
  );
};

export default StudentDashboard;
