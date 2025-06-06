import { Box, Button, TextField, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoginAdminMutation } from '../../services/authApi';
import { useNotification } from '../../context/NotificationProvider';
import { useAppDispatch } from '../../store/hooks';
import { setCredentials } from '../../store/slices/authSlice';

const schema = yup.object().shape({
  security_answer: yup.string().required('Security answer is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

type SecurityInputs = {
  security_answer: string;
  email: string;
};

const SuperAdminSecurityForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loginAdmin] = useLoginAdminMutation();
  const { showNotification } = useNotification();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SecurityInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: SecurityInputs) => {
    const response = await loginAdmin(data).unwrap();
    if (response?.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      dispatch(setCredentials({ token: response.token, user: response.user }));
      navigate('/dashboard');
      showNotification('Login successful', 'success');
    } else {
      console.error('Login failed:', response?.message || 'Unknown error');
      showNotification(response?.message || 'Login failed', 'error');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
      <Typography variant="h5" gutterBottom>
        Enter Security Code
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        mt={2}
        width="300px"
      >
        <TextField
          label="Email"
          fullWidth
          value={state?.email || ''}
          disabled
          margin="normal"
          {...register('email', { required: true })}
          error={!!errors.email}
          helperText={errors.email ? 'Email is required' : ''}
          autoComplete="email"
          autoFocus
        />
        <TextField
          label="Security Answer"
          fullWidth
          {...register('security_answer')}
          error={!!errors.security_answer}
          helperText={errors.security_answer?.message}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          type="submit"
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default SuperAdminSecurityForm;
