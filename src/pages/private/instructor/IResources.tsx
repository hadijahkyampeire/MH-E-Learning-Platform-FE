import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Stack,
  Typography,
  Input,
  IconButton,
  TextField,
} from '@mui/material';
import { Visibility, VisibilityOff, UploadFile } from '@mui/icons-material';
import { type Column } from '../../../components/ui/Table/Table';
import Table from '../../../components/ui/Table/Table';
import ActionsDropdown from '../../../components/ui/Dropdown/ActionsDropdown';
import ConfirmDialog from '../../../components/ui/Dialog';
import { useParams } from 'react-router-dom';
import { useNotification } from '../../../context/NotificationProvider';
import {
  useGetResourcesQuery,
  useAddResourceMutation,
  useDeleteResourceMutation,
  useUpdateResourceMutation,
} from '../../../services/resources';
import ResourceModal from './ResourceModal';

interface ResourceItem {
  id: number;
  title: string;
  description?: string;
  createdAt: string;
  visible: boolean;
  fileName: string;
  fileUrl: string;
}

const TeacherResources: React.FC = () => {
  const { id: courseId } = useParams();
  const cid = courseId as string;

  const { showNotification } = useNotification();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [editingResource, setEditingResource] = useState<ResourceItem | null>();
  const [openModal, setOpenModal] = useState(false);

  const { data: apiResources = [] } = useGetResourcesQuery(cid);
  const [addResource] = useAddResourceMutation();
  const [deleteResource] = useDeleteResourceMutation();
  const [updateResource] = useUpdateResourceMutation();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openConfirmDelete = (id: number) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
    setConfirmOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      deleteResource({ courseId: cid, id: deleteId });
      setDeleteId(null);
      setConfirmOpen(false);
    }
  };

  useEffect(() => {
    const mapped = apiResources.map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      createdAt: r.created_at,
      visible: r.visible,
      fileName: r.file.filename,
      fileUrl: r.file.url,
    }));
    setResources(mapped);
  }, [apiResources]);

  const handleSubmit = async (data: {
    title: string;
    description: string;
    file: File | null;
  }) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      if (data.file) formData.append('file', data.file);

      if (editingResource) {
        await updateResource({
          courseId: cid,
          id: editingResource.id,
          data: formData as any,
        }).unwrap();
        showNotification('Resource updated successfully', 'success');
      } else {
        await addResource({ courseId: cid, data: formData as any }).unwrap();
        showNotification('Resource uploaded successfully', 'success');
      }

      setTitle('');
      setDescription('');
      setFile(null);
      setEditingResource(null);
      setOpenModal(false);
    } catch {
      showNotification('Resource upload failed, contact Admin', 'error');
    }
  };

  const toggleVisibility = async (id: number) => {
    const resource = resources.find((r) => r.id === id);
    if (!resource) return;
    try {
      await updateResource({
        courseId: cid,
        id: resource.id,
        data: { visible: !resource.visible },
      }).unwrap();
    } catch {
      showNotification('Failed to update visibility', 'error');
    }
  };

  const openEditModal = (resource: ResourceItem) => {
    setEditingResource(resource);
    setTitle(resource.title);
    setDescription(resource.description || '');
    setFile(null);
    setOpenModal(true);
  };

  const columns: Column<ResourceItem>[] = [
    { id: 'title', label: 'Title' },
    { id: 'description', label: 'Description' },
    {
      id: 'file',
      label: 'File',
      render: (row) => {
        console.log(row);
        return row.fileName ? (
          <a href={row.fileUrl} target="_blank" rel="noopener noreferrer">
            {row.fileName}
          </a>
        ) : (
          'No File'
        );
      },
    },
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
          {row.visible ? (
            <Visibility color="primary" />
          ) : (
            <VisibilityOff color="disabled" />
          )}
        </IconButton>
      ),
    },
    {
      id: 'actions',
      label: 'Actions',
      render: (row) => (
        <ActionsDropdown
          row={row}
          onEdit={openEditModal}
          onDelete={openConfirmDelete}
        />
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom color="primary">
        Manage Course Resources
      </Typography>

      <Box
        sx={{
          p: 3,
          mb: 4,
          background: '#f9f9f9',
          borderRadius: 2,
          maxWidth: 600,
        }}
      >
        <Typography variant="subtitle1" gutterBottom>
          Upload Resource
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Title"
            fullWidth
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            size="small"
            multiline
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            type="file"
            onChange={(e) =>
              setFile((e.target as HTMLInputElement).files?.[0] || null)
            }
          />
          <Button
            variant="contained"
            startIcon={<UploadFile />}
            onClick={() => handleSubmit({ title, description, file })}
            disabled={!title || !file}
          >
            Upload
          </Button>
        </Stack>
      </Box>

      <Table<ResourceItem>
        rows={resources}
        columns={columns}
        getRowId={(row) => row.id}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Resource"
        description="Are you sure you want to delete this resource? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <ResourceModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingResource(null);
        }}
        onSubmit={handleSubmit}
        initialData={
          editingResource
            ? {
                title: editingResource.title,
                description: editingResource.description,
              }
            : undefined
        }
        isEdit={!!editingResource}
      />
    </Box>
  );
};

export default TeacherResources;
