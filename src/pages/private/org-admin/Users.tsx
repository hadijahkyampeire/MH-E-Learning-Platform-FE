import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import AddUserForm from './AddUser';
import { useAppSelector } from '../../../store/hooks';
import {
  useGetOrgUsersQuery,
  useActivateOrgUserMutation,
  useDeactiveOrgUserMutation,
} from '../../../services/usersApi';
import Table from '../../../components/ui/Table';

import type { User } from '../../../types/user';

function Users() {
  const [open, setOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data: users = [], refetch: fetchUsers } = useGetOrgUsersQuery();
  const [activateOrgUser] = useActivateOrgUserMutation();
  const [deactivateOrgUser] = useDeactiveOrgUserMutation();

  const currentUser = useAppSelector((state) => state.auth.user);
  const filteredUsers = users.filter((user) => user.id !== currentUser?.id);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMenuOpen = (event: React.MouseEvent, user: User) => {
    setSelectedUser(user);
    setMenuAnchor(event.currentTarget as HTMLElement);
  };

  const handleMenuClose = () => {
    setSelectedUser(null);
    setMenuAnchor(null);
  };

  const columns = [
    { field: 'email', headerName: 'Email', flex: 1 },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
      renderCell: ({ row }: any) =>
        row.role === 1 ? 'Admin' : row.role === 2 ? 'Instructor' : 'Student',
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: ({ row }: any) => (row.active ? 'Active' : 'Inactive'),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      renderCell: ({ row }: any) => (
        <IconButton onClick={(e) => handleMenuOpen(e, row)}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  const rows = filteredUsers.map((user) => ({
    id: `${user.email}-${user.role}`,
    email: user.email,
    role: user.role,
    active: user.active,
  }));

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5" color='primary'>Manage Users</Typography>
 
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          onClick={handleOpen}
        >
          Add User
        </Button>
      </Box>

      <Table rows={rows} columns={columns} pagination sorting />

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
              selectedUser.active
                ? await deactivateOrgUser(selectedUser.id)
                : await activateOrgUser(selectedUser.id);
              fetchUsers();
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
          Add New User
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <AddUserForm onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Users;
