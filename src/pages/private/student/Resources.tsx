import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Download, OpenInNew } from '@mui/icons-material';
import Table from '../../../components/ui/Table/Table';
import { type Column } from '../../../components/ui/Table/Table';
import { type ResourceItem, RESOURCE_KEY } from '../../../types/resources';

const StudentResources: React.FC = () => {
  const [visibleResources, setVisibleResources] = useState<ResourceItem[]>([]);
  const [previewResource, setPreviewResource] = useState<ResourceItem | null>(
    null
  );

  useEffect(() => {
    const saved = localStorage.getItem(RESOURCE_KEY);
    if (saved) {
      const all: ResourceItem[] = JSON.parse(saved);
      setVisibleResources(all.filter((r) => r.visible));
    }
  }, []);

  const download = (res: ResourceItem) => {
    const a = document.createElement('a');
    a.href = res.base64;
    a.download = res.title;
    a.click();
  };

  const columns: Column<ResourceItem>[] = [
    { id: 'title', label: 'Title' },
    {
      id: 'createdAt',
      label: 'Uploaded On',
      render: (row) => new Date(row.createdAt).toLocaleString(),
    },
    {
      id: 'actions',
      label: 'Actions',
      align: 'center',
      render: (row) => (
        <>
          <IconButton title="Preview" onClick={() => setPreviewResource(row)}>
            <OpenInNew />
          </IconButton>
          <IconButton title="Download" onClick={() => download(row)}>
            <Download />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom color='primary'>
        Available Resources
      </Typography>

      <Table<ResourceItem>
        rows={visibleResources}
        columns={columns}
        getRowId={(row) => row.id}
      />

      <Dialog
        open={!!previewResource}
        onClose={() => setPreviewResource(null)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Preview: {previewResource?.title}</DialogTitle>
        <DialogContent>
          {previewResource &&
            (previewResource.type.startsWith('image') ? (
              <img
                src={previewResource.base64}
                alt={previewResource.title}
                style={{ width: '100%' }}
              />
            ) : previewResource.type === 'application/pdf' ? (
              <iframe
                src={previewResource.base64}
                title="PDF Preview"
                width="100%"
                height="600px"
                style={{ border: 'none' }}
              />
            ) : (
              <Typography>Preview not supported for this file type.</Typography>
            ))}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default StudentResources;
