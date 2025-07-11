import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../../layouts/DashboardSidebar';
import DashboardHeader from '../../layouts/DashboardHeader';
import { useGetCoursesQuery } from '../../services/coursesApi';
import { useMobileNavigation, useResponsive } from '../../hooks/useResponsive';
import {
  Dashboard as DashboardIcon,
  AccountCircle as AccountCircleIcon,
  School as SchoolIcon,
  Book as BookIcon,
  Assignment as AssignmentIcon,
  Quiz as QuizIcon,
  Grade as GradeIcon,
} from '@mui/icons-material';

const StudentDashboard = () => {
  const { data: allCourses = [] } = useGetCoursesQuery();
  const { mobileOpen, handleDrawerToggle } = useMobileNavigation();
  const { isMobile } = useResponsive();

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

export default StudentDashboard;
