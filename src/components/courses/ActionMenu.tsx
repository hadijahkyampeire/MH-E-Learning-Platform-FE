import React, { useState } from 'react';
import {
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { type CourseRow } from '../../types/courses';

interface ActionMenuProps {
  row: CourseRow;
  onEdit: (row: CourseRow) => void;
  onDelete: (id: number) => void;
  onComplete: (course: CourseRow) => void;
  onDuplicate: (course: CourseRow) => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ row, onEdit, onDelete, onComplete, onDuplicate }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setOpenConfirm(false);
    onDelete(row.id);
  };

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            onEdit(row);
          }}
        >
          <EditIcon sx={{ color: 'primary.main', mr: 1 }} />
          <Typography color="primary">Edit</Typography>
        </MenuItem>

        {!row.is_completed && (
          <MenuItem
            onClick={() => {
              onComplete(row);
              handleMenuClose();
              // TODO: add markComplete(row.id) if needed
            }}
          >
            <CheckCircleIcon sx={{ color: 'success.main', mr: 1 }} />
            <Typography color="success.main">Mark Complete</Typography>
          </MenuItem>
        )}

        <MenuItem
          onClick={() => {
            handleMenuClose();
            onDuplicate(row);
          }}
        >
          <ContentCopyIcon sx={{ color: 'secondary.main', mr: 1 }} />
          <Typography color="secondary">Make a copy</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            setOpenConfirm(true);
          }}
        >
          <DeleteIcon sx={{ color: 'error.main', mr: 1 }} />
          <Typography color="error.main">Delete</Typography>
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <strong>{row.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ActionMenu;
