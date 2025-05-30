import { Box, Button, TextField, Typography } from '@mui/material';

export default function Login() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
      <Typography variant="h4">Login</Typography>
      <Box mt={2} width="300px">
        <TextField label="Email" fullWidth margin="normal" />
        <TextField label="Password" type="password" fullWidth margin="normal" />
        <Button variant="contained" color="primary" fullWidth>Login</Button>
      </Box>
    </Box>
  );
}
