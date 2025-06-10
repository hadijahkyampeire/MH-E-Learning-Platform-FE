import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const StudentOverview = () => {
  return (
    <Box>
      <Typography variant="h4">Welcome to Your Dashboard</Typography>
      <Typography sx={{ mt: 2 }}>
        Today is {new Date().toLocaleDateString()}
      </Typography>
    </Box>
  );
};

export default StudentOverview;
