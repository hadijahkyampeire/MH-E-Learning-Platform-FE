import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

interface ResourceModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string; file: File | null }) => void;
  initialData?: { title: string; description?: string };
  isEdit?: boolean;
}

const ResourceModal: React.FC<ResourceModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  isEdit = false,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (open) {
      setTitle(initialData?.title || '');
      setDescription(initialData?.description || '');
      setFile(null);
    }
  }, [open, initialData]);

  const handleSubmit = () => {
    if (!title || (!isEdit && !file)) return;
    onSubmit({ title, description, file });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? 'Edit Resource' : 'Add Resource'}</DialogTitle>
      <DialogContent>
        <Box mt={2}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={3}
          />
          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            {file ? file.name : 'Choose File'}
            <input hidden type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {isEdit ? 'Update' : 'Upload'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResourceModal;
