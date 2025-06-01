import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  fetchOrganizations,
  createOrganization,
} from '../../../store/slices/adminOrgsSlice';
import { fontOptions } from '../../../common/fonts';
import { colorOptions } from '../../../common/colors';

function Organizations() {
  const dispatch = useAppDispatch();
  const organizations = useAppSelector(
    (state) => state.adminOrganizations.organizations
  );
  const [open, setOpen] = useState(false);

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [font, setFont] = useState('');
  const [primaryLightColor, setPrimaryLightColor] = useState('');
  const [primaryDarkColor, setPrimaryDarkColor] = useState('');
  const [secondaryLightColor, setSecondaryLightColor] = useState('');
  const [secondaryDarkColor, setSecondaryDarkColor] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setName('');
    setCode('');
    setFont('');
    setPrimaryLightColor('');
    setPrimaryDarkColor('');
    setSecondaryLightColor('');
    setSecondaryDarkColor('');
  };

  const handleSubmit = async () => {
    await dispatch(
      createOrganization({
        name,
        code,
        settings: {
          font,
          primaryLightColor,
          primaryDarkColor,
          secondaryLightColor,
          secondaryDarkColor,
        },
      })
    );
    handleClose();
  };

  useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Manage Organizations</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          startIcon={<AddIcon />}
        >
          Add Organization
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Font</TableCell>
            <TableCell>Primary Light</TableCell>
            <TableCell>Primary Dark</TableCell>
            <TableCell>Secondary</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {organizations.map((org) => (
            <TableRow key={org.id}>
              <TableCell>{org.name}</TableCell>
              <TableCell>{org.code}</TableCell>
              <TableCell>{org.settings?.font}</TableCell>
              <TableCell>{org.settings?.primaryLightColor}</TableCell>
              <TableCell>{org.settings?.primaryDarkColor}</TableCell>
              <TableCell>{org.settings?.secondaryColor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
          <Box display="flex" flexDirection="column" gap={3} mt={1}>
            <Typography variant="h6">Organization Info</Typography>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              fullWidth
            />

            <Divider />
            <Typography variant="h6">Branding Settings</Typography>

            <TextField
              select
              label="Font"
              value={font}
              onChange={(e) => setFont(e.target.value)}
              fullWidth
            >
              {fontOptions.map((font) => (
                <MenuItem key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </MenuItem>
              ))}
            </TextField>

            <Box>
              <Typography variant="subtitle1">Light Mode Colors</Typography>
              <Box display="flex" gap={2} mt={1}>
                <TextField
                  select
                  label="Primary Light"
                  value={primaryLightColor}
                  onChange={(e) => setPrimaryLightColor(e.target.value)}
                  fullWidth
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

                <TextField
                  select
                  label="Secondary Light"
                  value={secondaryLightColor}
                  onChange={(e) => setSecondaryLightColor(e.target.value)}
                  fullWidth
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
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle1">Dark Mode Colors</Typography>
              <Box display="flex" gap={2} mt={1}>
                <TextField
                  select
                  label="Primary Dark"
                  value={primaryDarkColor}
                  onChange={(e) => setPrimaryDarkColor(e.target.value)}
                  fullWidth
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

                <TextField
                  select
                  label="Secondary Dark"
                  value={secondaryDarkColor}
                  onChange={(e) => setSecondaryDarkColor(e.target.value)}
                  fullWidth
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
              </Box>
            </Box>

            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save Organization
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Organizations;
