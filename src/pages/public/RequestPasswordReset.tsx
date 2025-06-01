import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

type ResetInputs = {
  email: string;
  organization: string;
};

const RequestResetPassword = () => {
  const { register, handleSubmit } = useForm<ResetInputs>();

  const onSubmit = (data: ResetInputs) => {
    console.log(data);
    alert("Check your email for the reset link.");
  };

  return (
    <Box p={3} maxWidth="400px">
      <Typography variant="h6">Reset Your Password</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register('email')}
        />
        <TextField
          label="Organization"
          fullWidth
          margin="normal"
          {...register('organization')}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Send Reset Link
        </Button>
      </form>
    </Box>
  );
};

export default RequestResetPassword;
