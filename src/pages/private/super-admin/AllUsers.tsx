import { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  fetchAdminUsers,
  createAdminUser,
} from '../../../store/slices/adminUserSlice';
import type { User } from '../../../types/user';
import { activateUser, deactivateUser } from '../../../api/admin';

function AllUsers() {
  const dispatch = useAppDispatch();
  const adminUsers = useAppSelector((state) => state.adminUsers.users);

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
    await dispatch(
      createAdminUser({ email, organization_id: Number(organizationId), role })
    );
    handleClose();
  };

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  const filteredUsers = adminUsers.filter(
    (user) => Number(user.role) === Number(selectedTab)
  );

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Manage Users</Typography>
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

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Organization</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.organization_name}</TableCell>
              <TableCell>{user.active ? 'Active' : 'Inactive'}</TableCell>
              <TableCell align="right">
                <IconButton onClick={(e) => handleMenuOpen(e, user)}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
              dispatch(fetchAdminUsers());
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
            <TextField
              label="Organization ID"
              value={organizationId}
              onChange={(e) => setOrganizationId(e.target.value)}
              fullWidth
              type="number"
            />
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              fullWidth
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="instructor">Instructor</MenuItem>
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
