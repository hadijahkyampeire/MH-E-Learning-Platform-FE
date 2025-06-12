import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface ResourceItem {
  id: number;
  title: string;
  description?: string;
  createdAt: string;
  visible: boolean;
  fileName: string;
  fileUrl: string;
}

interface Props {
  row: ResourceItem;
  onEdit: (item: ResourceItem) => void;
  onDelete: (id: number) => void;
}

const ActionsDropdown: React.FC<Props> = ({ row, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleEdit = () => {
    onEdit(row);
    handleClose();
  };

  const handleDelete = () => {
    onDelete(row.id);
    handleClose();
  };

  return (
    <>
      <Tooltip title="More actions">
        <IconButton onClick={handleOpen}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default ActionsDropdown;
