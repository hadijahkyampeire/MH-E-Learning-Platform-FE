import {
  Typography,
  Box,
  Paper,
  Divider,
  Chip,
  Link,
  IconButton,
  useTheme,
} from '@mui/material';
import { useEffect } from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Welcome = () => {
  const theme = useTheme();

  useEffect(() => {
    console.log('Welcome component mounted');
  }, []);

  console.log('Welcome component rendering');

  return (
    <Paper elevation={2} sx={{ p: 4, backgroundColor: 'background.paper' }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Welcome to MH E-Learning Platform
      </Typography>

      <Typography variant="body1" mt={2} color="text.primary">
        MH-ELP is a powerful e-learning platform designed to support the
        complete academic journey of your institution. Whether you're an admin
        managing users and settings, a mentor designing courses and assessments,
        or a student engaging with content and submitting work— MH-ELP brings
        everyone together on one seamless platform.
      </Typography>

      <Typography variant="body1" mt={2} color="text.primary">
        • Professors can create courses, upload learning materials, schedule
        quizzes and assignments, and track student progress.
      </Typography>
      <Typography variant="body1" mt={1} color="text.primary">
        • Students can join courses, access resources, submit assignments, take
        quizzes, and receive grades and feedback.
      </Typography>
      <Typography variant="body1" mt={1} color="text.primary">
        • Admins can manage users, configure permissions, and oversee the entire
        learning ecosystem.
      </Typography>

      <Typography variant="body1" mt={2} color="text.primary">
        Streamline your educational experience—intuitively, securely, and
        efficiently.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Development Team
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Hadijah K */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            <Chip
              label="Frontend: Hadijah K"
              color="primary"
              variant="outlined"
              size="small"
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                component={Link}
                href="https://www.linkedin.com/in/hadijahkyampeire/"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ color: '#0077B5' }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                component={Link}
                href="https://github.com/hadijahkyampeire"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#333' }}
              >
                <GitHubIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Mariam M */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            <Chip
              label="Backend: Mariam M"
              color="secondary"
              variant="outlined"
              size="small"
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                component={Link}
                href="https://www.linkedin.com/in/mariam-natukunda/"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ color: '#0077B5' }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                component={Link}
                href="https://github.com/magicmarie"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#333' }}
              >
                <GitHubIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default Welcome;
