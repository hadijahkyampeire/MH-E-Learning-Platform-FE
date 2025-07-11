import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Stack,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { Download } from '@mui/icons-material';
import Table from '../../../components/ui/Table/Table';
import { type Column } from '../../../components/ui/Table/Table';
import { type ResourceItem } from '../../../types/resources';
import { useGetResourcesQuery } from '../../../services/resources';

const StudentResources: React.FC = () => {
  const { id: courseId } = useParams();
  const [previewResource, setPreviewResource] = useState<ResourceItem | null>(
    null
  );

  const { data: resources, isLoading } = useGetResourcesQuery(courseId!, {
    skip: !courseId,
  });

  console.log(resources, 'res');
  const visibleResources: ResourceItem[] = (resources || [])
    .filter((r) => r.visible)
    .map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      visible: r.visible,
      createdAt: r.created_at,
      url: r.file.url,
      name: r.file.filename,
      type: r.file.content_type,
    }));

  const columns: Column<ResourceItem>[] = [
    { id: 'title', label: 'Title' },
    { id: 'description', label: 'Description' },
    {
      id: 'name',
      label: 'File',
      render: (row) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography
            variant="body2"
            color="primary"
            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => setPreviewResource(row)}
          >
            {row.name}
          </Typography>
          <IconButton
            size="small"
            title="Download"
            onClick={() => {
              window.open(row.url, '_blank');
            }}
          >
            <Download fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
    {
      id: 'createdAt',
      label: 'Uploaded On',
      render: (row) => new Date(row.createdAt).toLocaleString(),
    },
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Available Resources
      </Typography>

      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Table<ResourceItem>
          rows={visibleResources}
          columns={columns}
          getRowId={(row) => row.id}
        />
      )}

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
                src={previewResource.url}
                alt={previewResource.name}
                style={{ width: '100%' }}
              />
            ) : previewResource.type === 'application/pdf' ? (
              <iframe
                src={previewResource.url}
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
