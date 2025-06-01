import { Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/MenuBook';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import GradeIcon from '@mui/icons-material/Grade';
import { Outlet } from 'react-router-dom';
import DashboardHeader from '../../layouts/DashboardHeader';
import DashboardSidebar from '../../layouts/DashboardSidebar';


const StudentDashboard = () => {

  const courses = [
    { id: 101, name: 'Math 101' },
    { id: 102, name: 'Biology 102' },
  ];

  const sidebarItems = [
    {
      label: 'Courses',
      icon: <SchoolIcon />,
      children: courses.map(course => ({
        label: course.name,
        icon: <BookIcon />,
        children: [
          {
            label: 'Resources',
            path: `/student/courses/${course.id}/resources`,
            icon: <BookIcon />
          },
          {
            label: 'Assignments',
            path: `/student/courses/${course.id}/assignments`,
            icon: <AssignmentIcon />
          },
          {
            label: 'Quizzes',
            path: `/student/courses/${course.id}/quizzes`,
            icon: <QuizIcon />
          },
          {
            label: 'Grades',
            path: `/student/courses/${course.id}/grades`,
            icon: <GradeIcon />
          },
        ]
      })),
    },
  ];


  const handleChangePassword = () => {
    console.log('Redirect to change password');
    // navigate('/change-password')
  };

  return (
    <Box>
      <DashboardHeader
          onChangePassword={handleChangePassword}
        />
      <DashboardSidebar items={sidebarItems} />
      <Box sx={{ marginLeft: '240px', marginTop: '64px', p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default StudentDashboard;
