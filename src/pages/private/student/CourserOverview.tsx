import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useGetCourseQuery } from '../../../services/coursesApi';

const CourseOverview = () => {
  const { id } = useParams();
  const theme = useTheme();
  const { data: course, isLoading, isError } = useGetCourseQuery(id!);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !course) {
    return (
      <Box mt={4}>
        <Typography color="error">Failed to load course data.</Typography>
      </Box>
    );
  }

  const {
    name,
    course_code,
    semester,
    year,
    month,
    enrollment_count,
    is_completed,
    assignment_type_counts,
  } = course;

  const formattedMonth = new Date(year, month - 1).toLocaleString('default', {
    month: 'long',
  });

  return (
    <Box mt={2}>
      <Typography variant="h5" gutterBottom color="primary">
        Welcome to {name}
      </Typography>
      <Typography variant="body1" width={'50rem'}>
        This course will include regular homework, interactive quizzes,
        practical projects, and comprehensive exams. Make sure to stay on top of
        your assignments and check back often for updates!
      </Typography>

      <Card sx={{ mb: 3, mt: 3 }}>
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              borderBottom: `5px solid ${theme.palette.primary.main}`,
              width: '10rem',
            }}
          >
            Course Details
          </Typography>
          <Grid container spacing={2} mt={1}>
            <Grid size={6}>
              <strong>Course Code:</strong> {course_code}
            </Grid>
            <Grid size={6}>
              <strong>Semester:</strong> {semester}
            </Grid>
            <Grid size={6}>
              <strong>Year:</strong> {year}
            </Grid>
            <Grid size={6}>
              <strong>Start Month:</strong> {formattedMonth}
            </Grid>
            <Grid size={6}>
              <strong>Enrolled Students:</strong> {enrollment_count}
            </Grid>
            <Grid size={6}>
              <strong>Status:</strong> {is_completed ? 'Completed' : 'Ongoing'}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Assignment Breakdown</Typography>
          <Grid container spacing={2} mt={1}>
            {Object.entries(assignment_type_counts || {}).map(
              ([type, count]) => (
                <Grid size={6} key={type}>
                  <Typography>
                    <strong>
                      {type.charAt(0).toUpperCase() + type.slice(1)}:
                    </strong>{' '}
                    {count}
                  </Typography>
                </Grid>
              )
            )}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CourseOverview;
