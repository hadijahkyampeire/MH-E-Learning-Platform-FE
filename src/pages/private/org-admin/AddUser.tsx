import { Box, Button, MenuItem, Typography, TextField } from '@mui/material';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from '../../../store/hooks';
import { addOrgUser } from '../../../api/users';
import { fetchUsers } from '../../../store/slices/usersSlice';

const AddUserSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  role: yup.string().required('Role is required'),
});

type AddUserFormInputs = {
  email: string;
  role: string;
};

function AddUserForm({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserFormInputs>({
    resolver: yupResolver(AddUserSchema),
  });

  const onSubmit = async (data: AddUserFormInputs) => {
    try {
      await addOrgUser(data);
      dispatch(fetchUsers()); // Refresh users list
      onClose(); // Close modal after success
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography mb={2}>Fill in user details:</Typography>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="role"
        control={control}
        defaultValue={'teacher'}
        render={({ field }) => (
          <TextField
            label="Role"
            select
            fullWidth
            margin="normal"
            error={!!errors.role}
            helperText={errors.role?.message}
            {...field}
          >
            <MenuItem value="teacher">Instructor/Teacher</MenuItem>
            <MenuItem value="student">Student</MenuItem>
          </TextField>
        )}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Add User
      </Button>
    </Box>
  );
}

export default AddUserForm;
