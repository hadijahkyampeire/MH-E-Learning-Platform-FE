import { Typography, Box } from '@mui/material';

const Welcome = () => (
  <Box p={3}>
    <Typography variant="h5">Welcome to MH E-Learning Platform</Typography>
    <Typography variant="body1" mt={2}>
        MH-ELP  is a powerful e-learning platform designed to support the complete academic journey of your institution.
        Whether you're an admin managing users and settings, a mentor designing courses and assessments, or a student engaging with content and submitting work—
        MH-ELP brings everyone together on one seamless platform.
      </Typography>
      <Typography variant="body1" mt={2}>
        • Professors can create courses, upload learning materials, schedule quizzes and assignments, and track student progress.
      </Typography>
      <Typography variant="body1" mt={1}>
        • Students can join courses, access resources, submit assignments, take quizzes, and receive grades and feedback.
      </Typography>
      <Typography variant="body1" mt={1}>
        • Admins can manage users, configure permissions, and oversee the entire learning ecosystem.
      </Typography>
      <Typography variant="body1" mt={2}>
        Streamline your educational experience—intuitively, securely, and efficiently.
      </Typography>
  </Box>
);

export default Welcome;
