import { useState } from 'react';
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Tabs,
  Tab,
  Menu,
  FormControl,
  InputLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';

import {
  useGetAdminUsersQuery,
  useAddAdminUserMutation,
  useActivateAdminUserMutation,
  useDeactivateAdminUserMutation,
  useGetAdminOrganizationsQuery,
} from '../../../services/adminApi';
import type { User } from '../../../types/user';

function AllUsers() {
  const { data: adminUsers = [], refetch } = useGetAdminUsersQuery();
  const { data: organizations = [] } = useGetAdminOrganizationsQuery();
  const [addAdminUser] = useAddAdminUserMutation();
  const [activateUser] = useActivateAdminUserMutation();
  const [deactivateUser] = useDeactivateAdminUserMutation();

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [organizationId, setOrganizationId] = useState('');
  const [role, setRole] = useState('admin');
  const [selectedTab, setSelectedTab] = useState<'1' | '2' | '3'>('1');

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEmail('');
    setOrganizationId('');
    setRole('admin');
  };

  const handleMenuOpen = (event: React.MouseEvent, user: User) => {
    setSelectedUser(user);
    setMenuAnchor(event.currentTarget as HTMLElement);
  };

  const handleMenuClose = () => {
    setSelectedUser(null);
    setMenuAnchor(null);
  };

  const handleSubmit = async () => {
    if (!email || !organizationId || !role) return;
    await addAdminUser({
      email,
      organization_id: Number(organizationId),
      role,
    }).unwrap();
    handleClose();
  };

  const filteredUsers = adminUsers.filter(
    (user) => Number(user.role) === Number(selectedTab)
  );

  const rows = filteredUsers.map((user) => ({
    ...user,
    id: user.id || user.email,
    statusText: user.active ? 'Active' : 'Inactive',
  }));

  const columns = [
    { field: 'email', headerName: 'Email', width: 450 },
    { field: 'organization_name', headerName: 'Organization', width: 250 },
    {
      field: 'statusText',
      headerName: 'Status',
      width: 250,
      align: 'left' as const,
      headerAlign: 'left' as const,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      filterable: false,
      headerAlign: 'right' as const,
      renderCell: (params: any) => (
        <Box
          sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
        >
          <IconButton onClick={(e) => handleMenuOpen(e, params.row)}>
            <MoreVertIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5" color="primary">
          Manage Users
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          onClick={handleOpen}
        >
          Add User
        </Button>
      </Box>

      <Tabs
        value={selectedTab}
        onChange={(_, newValue) => setSelectedTab(newValue)}
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 2 }}
      >
        <Tab value="1" label="Organization Admins" />
        <Tab value="2" label="Instructors" />
        <Tab value="3" label="Students" />
      </Tabs>

      <Table rows={rows} columns={columns} pageSize={5} />

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => alert(`Edit ${selectedUser?.email}`)}>
          Edit
        </MenuItem>

        <MenuItem
          onClick={async () => {
            if (!selectedUser) return;
            try {
              if (selectedUser.active) {
                await deactivateUser(selectedUser?.id);
              } else {
                await activateUser(selectedUser?.id);
              }
              refetch();
            } catch (err) {
              console.error('Toggle user error:', err);
            } finally {
              handleMenuClose();
            }
          }}
          sx={{ color: selectedUser?.active ? 'red' : 'green' }}
        >
          {selectedUser?.active ? 'Deactivate' : 'Activate'}
        </MenuItem>
      </Menu>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Add Admin User
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              type="email"
            />
            <FormControl fullWidth>
              <InputLabel id="org-label">Organization</InputLabel>
              <Select
                labelId="org-label"
                value={organizationId}
                onChange={(e) => setOrganizationId(e.target.value)}
                label="Organization"
              >
                {organizations.map((org) => (
                  <MenuItem key={org.id} value={org.id}>
                    {org.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              fullWidth
            >
              <MenuItem value="org_admin">Admin</MenuItem>
              <MenuItem value="teacher">Instructor</MenuItem>
              <MenuItem value="student">Student</MenuItem>
            </Select>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save User
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default AllUsers;
