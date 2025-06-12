import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const CourseOverview = () => {
  const { id } = useParams();

  return (
    <Box>
      <Typography variant="h5">Course Overview</Typography>
      <Typography>Course ID: {id}</Typography>
      {/* Add more overview content as needed */}
    </Box>
  );
};

export default CourseOverview;
