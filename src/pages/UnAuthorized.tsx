import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Avatar,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import MHLogo from '../components/ui/logo';

function UnAuthorized() {
  const theme = useTheme();

  const handleGoHome = () => {
    localStorage.removeItem('token'); // Clear token from local storage
    localStorage.removeItem('user'); // Clear user data from local storage
    window.location.href = '/'; // Redirect to home page
    // Logic to redirect to home can be added here if needed
  };

  return (
    <Box>
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
          <Toolbar
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <Box display="flex" alignItems="center" width="200px">
              <MHLogo />
            </Box>
          </Toolbar>
        </Toolbar>
      </AppBar>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 64px)"
        bgcolor="#f9f9f9"
        px={2}
      >
        <Card elevation={3} sx={{ maxWidth: 400, width: '100%', p: 3 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Avatar
              sx={{
                bgcolor: 'error.main',
                mx: 'auto',
                mb: 2,
                width: 72,
                height: 72,
              }}
            >
              <LockOutlinedIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom>
              Unauthorized
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              You do not have permission to view this page. Check your access
              rights or contact support if you believe this is an error.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleGoHome}
            >
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default UnAuthorized;
