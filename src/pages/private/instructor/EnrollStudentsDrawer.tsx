import {
  Box,
  Drawer,
  IconButton,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useMemo } from 'react';
import Table from '../../../components/ui/Table/Table';

const students = [
  {
    id: 1,
    employeeId: 'EMP001',
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice.smith@example.com',
  },
  {
    id: 2,
    employeeId: 'EMP002',
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
  },
  {
    id: 3,
    employeeId: 'EMP003',
    firstName: 'Carol',
    lastName: 'Brown',
    email: 'carol.brown@example.com',
  },
  {
    id: 4,
    employeeId: 'EMP004',
    firstName: 'David',
    lastName: 'Lee',
    email: 'david.lee@example.com',
  },
  {
    id: 5,
    employeeId: 'EMP005',
    firstName: 'Eva',
    lastName: 'Green',
    email: 'eva.green@example.com',
  },
  {
    id: 6,
    employeeId: 'EMP006',
    firstName: 'Frank',
    lastName: 'Wright',
    email: 'frank.wright@example.com',
  },
];

function EnrollStudentsDrawer({
  open,
  onClose,
  users,
  selectedIds,
  onSelectChange,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  users: any[];
  selectedIds: number[];
  onSelectChange: (ids: number[]) => void;
  onConfirm: () => void;
}) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const studentData = users.length > 0 ? users : students;


  const filtered = useMemo(() => {
    return studentData.filter(
      (u) =>
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        // u.lastName.toLowerCase().includes(search.toLowerCase()) ||
        u.id.toLowerCase().includes(search.toLowerCase())
    );
  }, [studentData, search]);

  const rows = useMemo(() => {
    return filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filtered, page, rowsPerPage]);

  const columns = [
    { id: 'id', label: 'Student ID' },
    {
      id: 'email',
      label: 'Email',
    },
  ];

  const handleToggle = (id: string | number) => {
    onSelectChange(
      selectedIds.includes(Number(id))
        ? selectedIds.filter((i) => i !== Number(id))
        : [...selectedIds, Number(id)]
    );
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 550, p: 2, mt: '64px' }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" color='secondary'>Select Students</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <TextField
          fullWidth
          label="Search by Email or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size='small'
          margin='normal'
          sx={{ mb: 4 }}
        />

        <Table
          rows={rows}
          columns={columns}
          enableCheckbox
          selectedRowIds={selectedIds}
          onRowSelectToggle={handleToggle}
          enablePagination
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={filtered.length}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
        />

        <Box mt={2}>
          <Button
            fullWidth
            variant="contained"
            disabled={selectedIds.length === 0}
            onClick={onConfirm}
          >
            Enroll {selectedIds.length} Student
            {selectedIds.length !== 1 ? 's' : ''}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
export default EnrollStudentsDrawer;
