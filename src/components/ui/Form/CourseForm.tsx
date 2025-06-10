import { Box, Button, MenuItem, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from '../Input';
import { useAppSelector } from '../../../store/hooks';
import { useGetOrganizationsQuery } from '../../../services/organizationsApi';
import { useAddCourseMutation } from '../../../services/coursesApi';
import { useNotification } from '../../../context/NotificationProvider';
import Dropdown from '../Dropdown';

const CourseSchema = yup.object().shape({
  name: yup.string().required('Course name is required'),
  course_code: yup.string().required('Course code is required'),
  semester: yup.string().required('Semester is required'),
  month: yup.number().min(1).max(12).required('Month is required'),
  year: yup.number().required('Year is required'),
  user_id: yup.number().required('Instructor is required'),
  organization_id: yup.number().required('Organization is required'),
});

export type CourseFormInputs = yup.InferType<typeof CourseSchema>;

interface Props {
  onSuccess: () => void;
  isOrgAdmin: boolean;
}

const mapErrorToField = (msg: string): keyof CourseFormInputs | undefined => {
  const lower = msg.toLowerCase();

  if (lower.includes('name')) return 'name';
  if (lower.includes('code')) return 'course_code';
  if (lower.includes('semester')) return 'semester';
  if (lower.includes('month')) return 'month';
  if (lower.includes('year')) return 'year';
  if (lower.includes('instructor') || lower.includes('user')) return 'user_id';

  return undefined;
};

const CourseForm = ({ onSuccess, isOrgAdmin }: Props) => {
  const user = useAppSelector((state) => state.auth.user);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CourseFormInputs>({
    resolver: yupResolver(CourseSchema),
    defaultValues: {
      name: '',
      course_code: '',
      semester: 'first',
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      user_id: user?.id || undefined,
      organization_id: user?.organization_id || undefined,
    },
  });

  const { data: orgUsers = [] } = useGetOrganizationsQuery();
  const [addCourse, { isLoading }] = useAddCourseMutation();
  const { showNotification } = useNotification();

  const onSubmit = async (values: CourseFormInputs) => {
    console.log('Form Values:', values);
    const payload = {
      ...values,
      user_id: isOrgAdmin ? values.user_id || user?.id : user?.id,
    };

    try {
      await addCourse(payload).unwrap();
      showNotification('Course created successfully', 'success');
      onSuccess();
    } catch (err) {
      let errors: string[] = ['An unknown error occurred'];

      if (
        err &&
        typeof err === 'object' &&
        'data' in err &&
        err.data &&
        typeof err.data === 'object'
      ) {

        errors =
          (Array.isArray((err.data as any)?.errors) && (err.data as any).errors) ||
          [((err.data as any)?.error)];
      }

      let matched = false;

      errors.forEach((msg) => {
        const field = mapErrorToField(msg);
        if (field) {
          setError(field, { message: msg });
          matched = true;
        }
      });

      if (!matched) {
        showNotification('Failed to create course', 'error');
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} mt={2}>
      <Typography variant="h6">Create Course</Typography>

      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              error={!!errors.name}
              helperText={errors.name?.message}
              label="Course Name"
              fullWidth
            />
          )}
        />
        <Controller
          name="course_code"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              label="Course Code"
              fullWidth
              error={!!errors.course_code}
              helperText={errors.course_code?.message}
            />
          )}
        />
        <Controller
          name="semester"
          control={control}
          render={({ field }) => (
            <Dropdown
              {...field}
              label="Semester"
              options={[
                { value: 'first', label: 'First Semester' },
                { value: 'second', label: 'Second Semester' },
                { value: 'summer', label: 'Summer Semester' },
              ]}
              error={!!errors.semester}
              helperText={errors.semester?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="month"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              label="Month"
              type="number"
              error={!!errors.month}
              helperText={errors.month?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="year"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              label="Year"
              type="number"
              error={!!errors.year}
              helperText={errors.year?.message}
              fullWidth
            />
          )}
        />

        {isOrgAdmin && (
          <Controller
            name="user_id"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label="Assign Instructor"
                select
                fullWidth
                error={!!errors.user_id}
                helperText={errors.user_id?.message}
              >
                {orgUsers
                  .filter((u) => u.role === 2)
                  .map((instructor) => (
                    <MenuItem key={instructor.id} value={instructor.id}>
                      {instructor.email}
                    </MenuItem>
                  ))}
              </InputField>
            )}
          />
        )}

        <Button variant="contained" type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </Box>
    </Box>
  );
};

export default CourseForm;
