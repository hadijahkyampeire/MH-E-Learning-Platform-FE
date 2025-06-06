import { Box, Button, MenuItem, Typography } from '@mui/material';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  useAddOrgUserMutation,
  useGetOrgUsersQuery,
} from '../../../services/usersApi';
import { useNotification } from '../../../context/NotificationProvider';
import InputField from '../../../components/ui/Input';

const AddUserSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  role: yup.string().required('Role is required'),
});

type AddUserFormInputs = {
  email: string;
  role: string;
};

function AddUserForm({ onClose }: { onClose: () => void }) {
  const [addOrgUser] = useAddOrgUserMutation();
  const { showNotification } = useNotification();
  const { refetch: fetchUsers } = useGetOrgUsersQuery();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserFormInputs>({
    resolver: yupResolver(AddUserSchema),
  });

  const onSubmit = async (data: AddUserFormInputs) => {
    try {
      await addOrgUser(data).unwrap();
      showNotification('User added successfully', 'success');
      fetchUsers();
      onClose();
    } catch (error) {
      console.error('Error adding user:', error);
      showNotification('Failed to add user', 'error');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography mb={2} color="primary">
        Fill in user details:
      </Typography>
      <Box display="flex" flexDirection="column" gap={2} mt={1}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              label="Role"
              select
              fullWidth
              error={!!errors.role}
              helperText={errors.role?.message}
            >
              <MenuItem value="teacher">Instructor</MenuItem>
              <MenuItem value="student">Student</MenuItem>
            </InputField>
          )}
        />

        <Button type="submit" variant="contained" color="primary">
          Create User
        </Button>
      </Box>
    </Box>
  );
}

export default AddUserForm;
