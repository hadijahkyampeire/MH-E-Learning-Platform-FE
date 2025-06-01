import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
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
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { fetchUsers } from '../../../store/slices/usersSlice';
import { activateOrgUser, deactivateOrgUser } from '../../../api/users';
import type { User } from '../../../types/user';

function Users() {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const users = useAppSelector((state) => state.users.users);
  const currentUser = useAppSelector((state) => state.auth.user);
  const filteredUsers = users.filter(user => user.id !== currentUser?.id);


  useEffect(() => {
    const fetchApiUsers = async () => {
      try {
        await dispatch(fetchUsers());
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchApiUsers();
  }, [dispatch]);

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

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5">All Users</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          onClick={handleOpen}
        >
          Add User
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.role === 1
                  ? 'Admin'
                  : user.role === 2
                  ? 'Instructor'
                  : 'Student'}
              </TableCell>
              <TableCell>{user.active ? 'Active' : 'Inactive'}</TableCell>
              <TableCell>
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
                await deactivateOrgUser(selectedUser?.id);
              } else {
                await activateOrgUser(selectedUser?.id);
              }
              dispatch(fetchUsers());
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
