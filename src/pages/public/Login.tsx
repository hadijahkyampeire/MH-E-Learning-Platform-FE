import {
  Box,
  Button,
  TextField,
  Autocomplete,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { setCredentials } from '../../store/slices/authSlice';
import { useLoginMutation } from '../../services/authApi';
import { useGetOrganizationsQuery } from '../../services/organizationsApi';
import * as yup from 'yup';
import { useNotification } from '../../context/NotificationProvider';

type LoginFormInputs = {
  email: string;
  organization_id: number;
  password: string;
};

type LoginPayload = {
  email: string;
  password: string;
  organization_id?: number;
};

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  organization_id: yup
    .number()
    .typeError('Organization is required')
    .required('Organization is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SA_OPTION = { id: 0, organization_code: 'SA001' };

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { showNotification } = useNotification();
  const { data: organizations = [], isLoading: loadingOrgs } =
    useGetOrganizationsQuery();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const organizationOptions = [SA_OPTION, ...organizations];

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    const finalPayload: LoginPayload = {
      email: data.email,
      password: data.password,
      organization_id:
        data.organization_id === 0 ? undefined : data.organization_id,
    };

    try {
      const result = await login(finalPayload).unwrap();
      const { user, token, message } = result;

      if (!token && message === 'MFA') {
        navigate('/security', {
          state: { email: data.email, password: data.password },
        });
        showNotification('Please complete next step', 'info');
      } else {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(setCredentials({ user, token }));

        if (user.role === 'org_admin') navigate('/admin');
        else if (user.role === 'teacher') navigate('/instructor');
        else if (user.role === 'student') navigate('/student');
        showNotification('Login successful', 'success');
      }
    } catch (error) {
      const err = error as { data?: { message?: string } };
      showNotification(
        err?.data?.message || 'Login failed. Please try again.',
        'error'
      );
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      flexDirection={isMobile ? 'column' : 'row'}
      alignItems="center"
      justifyContent="flex-end"
      gap={isMobile ? 2 : 2}
      width="100%"
      sx={{
        maxWidth: '100%',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: isMobile ? '100%' : '200px',
          minWidth: isMobile ? 'auto' : '200px',
        }}
      >
        <TextField
          label="Email"
          fullWidth
          size="small"
          {...register('email')}
          error={!!errors.email}
          helperText={String(errors.email?.message || '')}
        />
      </Box>
      <Box
        sx={{
          width: isMobile ? '100%' : '200px',
          minWidth: isMobile ? 'auto' : '200px',
        }}
      >
        <Controller
          name="organization_id"
          control={control}
          rules={{ required: 'Organization is required' }}
          render={({ field }) => (
            <Autocomplete
              loading={loadingOrgs}
              options={organizationOptions}
              getOptionLabel={(option) => option.organization_code}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_, selected) =>
                field.onChange(selected?.id ?? SA_OPTION.id)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Organization"
                  error={!!errors.organization_id}
                  helperText={String(errors.organization_id?.message || '')}
                  size="small"
                  fullWidth
                />
              )}
            />
          )}
        />
      </Box>
      <Box
        sx={{
          width: isMobile ? '100%' : '200px',
          minWidth: isMobile ? 'auto' : '200px',
        }}
      >
        <TextField
          label="Password"
          type="password"
          fullWidth
          size="small"
          {...register('password')}
          error={!!errors.password}
          helperText={String(errors.password?.message || '')}
        />
      </Box>
      <Button
        variant="contained"
        type="submit"
        sx={{
          width: isMobile ? '100%' : 'auto',
          minWidth: isMobile ? 'auto' : '100px',
          height: '40px',
        }}
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </Box>
  );
};

export default LoginForm;
