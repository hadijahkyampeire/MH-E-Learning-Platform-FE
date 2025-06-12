import { useParams, Outlet } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useGetCourseQuery } from '../../../services/coursesApi';
import DashboardSidebar from '../../../layouts/DashboardSidebar';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import FolderIcon from '@mui/icons-material/Folder';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import { Link as RouterLink } from 'react-router-dom';
import { months } from '../../../common/months';
import { capitalize } from 'lodash';

const CourseDetailsPage = () => {
  const { id } = useParams();
  const { data: course, isLoading } = useGetCourseQuery(id!);

  if (isLoading) return <div>Loading...</div>;
  if (!course) return <div>Course not found</div>;

  const courseMenuItems = [
    {
      type: 'custom' as const,
      label: `${course.name}`,
      customRender: (
        <Box p={2} pb={1} sx={{ borderBottom: '1px solid #e0e0e0' }}>
          <Typography
            variant="body1"
            color="text.primary"
            fontWeight="bold"
            align="center"
          >
            {course.name} - {course.course_code}
          </Typography>

          <Typography color="text.secondary" align="center" fontSize={14}>
            {capitalize(course.semester)} semester
          </Typography>
          <Typography color="text.secondary" align="center" fontSize={12}>
            {months[course.month as keyof typeof months]}, {course.year}
          </Typography>
        </Box>
      ),
    },
    {
      label: 'Enrollments',
      path: `/instructor/courses/${id}/enrollments`,
      icon: <GroupAddIcon fontSize="small" />,
    },
    {
      label: 'Resources',
      path: `/instructor/courses/${id}/resources`,
      icon: <FolderIcon fontSize="small" />,
    },
    {
      label: 'Assignments',
      path: `/instructor/courses/${id}/assignments`,
      icon: <AssignmentIcon fontSize="small" />,
    },
    {
      label: 'Quizzes',
      path: `/instructor/courses/${id}/quizzes`,
      icon: <QuizIcon fontSize="small" />,
    },
  ];

  return (
    <>
      <DashboardSidebar items={courseMenuItems} width={240} />

      <Breadcrumbs aria-label="breadcrumb">
        <Link
          component={RouterLink}
          underline="hover"
          color="inherit"
          to="/instructor/courses"
        >
          Courses
        </Link>
        <Typography color="text.primary">{course.name}</Typography>
      </Breadcrumbs>

      <Box flex={1} p={3}>
        <Outlet />
      </Box>
    </>
  );
};

export default CourseDetailsPage;
