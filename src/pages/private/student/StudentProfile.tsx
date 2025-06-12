import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const StudentProfile = () => {
  return (
    <Box>
      <Typography variant="h4">Your Profile</Typography>
      <Typography>Name: Jane Doe</Typography>
      <Typography>Email: jane@example.com</Typography>
      {/* Add edit or password change buttons later */}
    </Box>
  );
};

export default StudentProfile;
