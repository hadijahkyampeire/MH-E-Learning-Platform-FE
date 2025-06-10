import React, { useEffect, useState } from 'react';
import {
  Box, Button, Stack, Typography, Input, IconButton
} from '@mui/material';
import { Visibility, VisibilityOff, UploadFile } from '@mui/icons-material';
import { type Column } from '../../../components/ui/Table/Table';
import Table from '../../../components/ui/Table/Table'; 
import { type ResourceItem, RESOURCE_KEY } from '../../../types/resources';
import { useNotification } from '../../../context/NotificationProvider';

const TeacherResources: React.FC = () => {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    const saved = localStorage.getItem(RESOURCE_KEY);
    if (saved) {
      setResources(JSON.parse(saved));
    }
  }, []);

  const saveResources = (updated: ResourceItem[]) => {
    setResources(updated);
    localStorage.setItem(RESOURCE_KEY, JSON.stringify(updated));
  };

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleUpload = async () => {
    if (!selectedFiles) return;

    const files = Array.from(selectedFiles);
    const newItems: ResourceItem[] = await Promise.all(
      files.map(async (file, index) => ({
        id: Date.now() + index,
        title: file.name,
        createdAt: new Date().toISOString(),
        visible: false,
        base64: await fileToBase64(file),
        type: file.type,
      }))
    );

    const updated = [...resources, ...newItems];
    saveResources(updated);
    setSelectedFiles(null);
    showNotification('Files uploaded successfully', 'success');
  };

  const toggleVisibility = (id: number) => {
    const updated = resources.map(r => r.id === id ? { ...r, visible: !r.visible } : r);
    saveResources(updated);
  };

  const columns: Column<ResourceItem>[] = [
    { id: 'title', label: 'Title' },
    {
      id: 'createdAt',
      label: 'Created At',
      render: (row) => new Date(row.createdAt).toLocaleString(),
    },
    {
      id: 'visible',
      label: 'Visibility',
      align: 'center',
      render: (row) => (
        <IconButton onClick={() => toggleVisibility(row.id)}>
          {row.visible ? <Visibility color="primary" /> : <VisibilityOff color="disabled" />}
        </IconButton>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom color='primary'>Manage Course Resources</Typography>

      <Box sx={{ p: 3, mb: 4, background: '#f9f9f9', borderRadius: 2 }}>
        <Typography variant="subtitle1">Upload File(s)</Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Input
            type="file"
            inputProps={{ multiple: true }}
            onChange={e => setSelectedFiles((e.target as HTMLInputElement).files)}
          />
          <Button variant="contained" startIcon={<UploadFile />} onClick={handleUpload} disabled={!selectedFiles}>
            Upload
          </Button>
        </Stack>
      </Box>

      <Table<ResourceItem>
        rows={resources}
        columns={columns}
        getRowId={(row) => row.id}
      />
    </Box>
  );
};

export default TeacherResources;
