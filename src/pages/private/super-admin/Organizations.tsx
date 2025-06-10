import { useState } from 'react';
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  MenuItem,
  Divider,
} from '@mui/material';
import Table from '../../../components/ui/Table/Table';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import {
  useGetAdminOrganizationsQuery,
  useCreateAdminOrganizationMutation,
} from '../../../services/adminApi';
import { fontOptions } from '../../../common/fonts';
import { colorOptions } from '../../../common/colors';
import Button from '../../../components/ui/Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNotification } from '../../../context/NotificationProvider';

const formSchema = yup.object().shape({
  name: yup.string().required('Organization Name is required'),
  organization_code: yup.string().required('Organization Code is required'),
  font: yup.string().nullable(),
  primaryLightColor: yup.string().nullable(),
  primaryDarkColor: yup.string().nullable(),
  secondaryLightColor: yup.string().nullable(),
  secondaryDarkColor: yup.string().nullable(),
});

type FormValues = {
  name: string;
  organization_code: string;
  font?: string | null;
  primaryLightColor?: string | null;
  primaryDarkColor?: string | null;
  secondaryLightColor?: string | null;
  secondaryDarkColor?: string | null;
};

function Organizations() {
  const { data: organizations = [], refetch } = useGetAdminOrganizationsQuery();
  const [addAdminOrganization] = useCreateAdminOrganizationMutation();
  const { showNotification } = useNotification();
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(formSchema) });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (payload: FormValues) => {
    const requestBody = {
      name: payload.name,
      organization_code: payload.organization_code,
      settings: {
        font: payload.font ?? '',
        primaryLightColor: payload.primaryLightColor ?? '',
        primaryDarkColor: payload.primaryDarkColor ?? '',
        secondaryLightColor: payload.secondaryLightColor ?? '',
        secondaryDarkColor: payload.secondaryDarkColor ?? '',
      },
    };

    try {
      await addAdminOrganization(requestBody).unwrap();
      refetch();
      handleClose();
      showNotification('Organization added successfully', 'success');
    } catch (err: any) {
      const errors: string[] = err?.data?.errors || [];
      errors.forEach((msg) => {
        if (msg.includes('Name')) {
          setError('name', { message: msg });
        } else if (msg.includes('code')) {
          setError('organization_code', { message: msg });
        }
      });
    }
  };

  const columns = [
    { id: 'name', label: 'Name', flex: 1, sortable: true },
    { id: 'organization_code', label: 'Code', width: 150, sortable: true },
    { id: 'font', label: 'Font', width: 150 },
    { id: 'primaryLightColor', label: 'Primary Light', width: 150 },
    { id: 'primaryDarkColor', label: 'Primary Dark', width: 150 },
    { id: 'secondaryColor', label: 'Secondary', width: 150 },
  ];

  const rows = organizations.map((org) => ({
    id: org.id,
    name: org.name,
    organization_code: org.organization_code,
    font: org.settings?.font || '—',
    primaryLightColor: org.settings?.primaryLightColor || '—',
    primaryDarkColor: org.settings?.primaryDarkColor || '—',
    secondaryColor: org.settings?.secondaryColor || '—',
  }));

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5" color="primary">
          Manage Organizations
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          startIcon={<AddIcon />}
        >
          Onboard New Organization
        </Button>
      </Box>

      <Table
        rows={rows}
        columns={columns}
        enablePagination
        enableHover
        enableHighlight
      />

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Add Organization
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="column" gap={3} mt={1}>
              <Typography variant="h6">Organization Info</Typography>

              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: 'Name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Name"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />

              <Controller
                name="organization_code"
                control={control}
                defaultValue=""
                rules={{ required: 'Code is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Code"
                    fullWidth
                    error={!!errors.organization_code}
                    helperText={errors.organization_code?.message}
                  />
                )}
              />

              <Divider />
              <Typography variant="h6">Branding Settings</Typography>

              <Controller
                name="font"
                control={control}
                defaultValue={fontOptions[0]}
                render={({ field }) => (
                  <TextField select label="Font" fullWidth {...field}>
                    {fontOptions.map((font) => (
                      <MenuItem
                        key={font}
                        value={font}
                        style={{ fontFamily: font }}
                      >
                        {font}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              <Box>
                <Typography variant="subtitle1">Light Mode Colors</Typography>
                <Box display="flex" gap={2} mt={1}>
                  <Controller
                    name="primaryLightColor"
                    control={control}
                    defaultValue={colorOptions[0].code}
                    render={({ field }) => (
                      <TextField
                        select
                        label="Primary Light"
                        fullWidth
                        {...field}
                      >
                        {colorOptions.map((color) => (
                          <MenuItem key={color.name} value={color.code}>
                            <Box
                              sx={{
                                display: 'inline-block',
                                width: 12,
                                height: 12,
                                backgroundColor: color.code,
                                borderRadius: '50%',
                                marginRight: 1,
                              }}
                            />
                            {color.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />

                  <Controller
                    name="secondaryLightColor"
                    control={control}
                    defaultValue={colorOptions[1].code}
                    render={({ field }) => (
                      <TextField
                        select
                        label="Secondary Light"
                        fullWidth
                        {...field}
                      >
                        {colorOptions.map((color) => (
                          <MenuItem key={color.name} value={color.code}>
                            <Box
                              sx={{
                                display: 'inline-block',
                                width: 12,
                                height: 12,
                                backgroundColor: color.code,
                                borderRadius: '50%',
                                marginRight: 1,
                              }}
                            />
                            {color.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle1">Dark Mode Colors</Typography>
                <Box display="flex" gap={2} mt={1}>
                  <Controller
                    name="primaryDarkColor"
                    control={control}
                    defaultValue={colorOptions[0].code}
                    render={({ field }) => (
                      <TextField
                        select
                        label="Primary Dark"
                        fullWidth
                        {...field}
                      >
                        {colorOptions.map((color) => (
                          <MenuItem key={color.name} value={color.code}>
                            <Box
                              sx={{
                                display: 'inline-block',
                                width: 12,
                                height: 12,
                                backgroundColor: color.code,
                                borderRadius: '50%',
                                marginRight: 1,
                              }}
                            />
                            {color.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />

                  <Controller
                    name="secondaryDarkColor"
                    control={control}
                    defaultValue={colorOptions[2].code}
                    render={({ field }) => (
                      <TextField
                        select
                        label="Secondary Dark"
                        fullWidth
                        {...field}
                      >
                        {colorOptions.map((color) => (
                          <MenuItem key={color.name} value={color.code}>
                            <Box
                              sx={{
                                display: 'inline-block',
                                width: 12,
                                height: 12,
                                backgroundColor: color.code,
                                borderRadius: '50%',
                                marginRight: 1,
                              }}
                            />
                            {color.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Box>
              </Box>

              <Button type="submit" variant="contained" color="primary">
                Save Organization
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Organizations;
