import { Box, Button, TextField, Autocomplete } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { login } from '../../store/slices/authSlice';
import { fetchOrganizations } from '../../store/slices/organizationSlice';
import * as yup from 'yup';
import { useEffect } from 'react';

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

const SA_OPTION = { id: -1, organization_code: 'SA001' };

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { organizations, loading } = useAppSelector(
    (state) => state.organizations
  );

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
      organization_id: data.organization_id ?? undefined,
    };

    if (data.organization_id === SA_OPTION.id) {
      delete finalPayload.organization_id;
    }

    const result = await dispatch(login(finalPayload));

    if (login.fulfilled.match(result)) {
      const { user, token, message } = result.payload;

      if (!token && message === 'MFA') {
        navigate('/security', {
          state: { email: data.email, password: data.password },
        });
      } else {
        if (user.role === 1) navigate('/admin');
        else if (user.role === 2) navigate('/instructor');
        else if (user.role === 3) navigate('/student');
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchOrganizations());
    };
    fetchData();
  }, [dispatch]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      alignItems="flex-start"
      justifyContent="flex-end"
      gap={2}
      pt={2}
      width="100%"
    >
      <Box width={250}>
        <TextField
          label="Email"
          fullWidth
          size="small"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message ?? ' '}
        />
      </Box>
      <Box width={250}>
        <Controller
          name="organization_id"
          control={control}
          rules={{ required: 'Organization is required' }}
          render={({ field }) => (
            <Autocomplete
              loading={loading}
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
                  helperText={errors.organization_id?.message ?? ' '}
                  size="small"
                  fullWidth
                />
              )}
            />
          )}
        />
      </Box>
      <Box width={250}>
        <TextField
          label="Password"
          type="password"
          fullWidth
          size="small"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message ?? ' '}
        />
      </Box>
      <Button variant="contained" type="submit" sx={{ mt: '2px' }}>
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
