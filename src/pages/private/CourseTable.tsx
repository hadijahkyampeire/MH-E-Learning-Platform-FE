import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Table, { type Column } from '../../components/ui/Table/Table';

export interface CourseRow {
  id: number;
  name: string;
  course_code: string;
  semester: number | string;
  month: number;
  year: number;
  is_completed: boolean;
  instructorEmail: string;
  organizationName: string;
  enrolledCount?: number;
  assignmentCount?: number;
  quizCount?: number;
}

type Props = {
  rows: CourseRow[];
  onEdit: (courseId: number) => void;
  onDelete: (courseId: number) => void;
};

const CourseTable: React.FC<Props> = ({ rows, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const basePath = location.pathname.startsWith('/admin')
    ? '/admin/courses'
    : '/instructor/courses';

  const columns: Column<any>[] = [
    {
      id: 'name',
      label: 'Course Name',
      render: (row) => (
        <Button
          variant="text"
          color="primary"
          onClick={() => navigate(`${basePath}/${row.id}`)}
        >
          {row.name}
        </Button>
      ),
    },
    { id: 'course_code', label: 'Code' },
    { id: 'semester', label: 'Semester' },
    { id: 'year', label: 'Year' },
    {
      id: 'is_completed',
      label: 'Completed?',
      render: (row) => (row.is_completed ? 'Yes' : 'No'),
    },
    {
      id: 'actions',
      label: 'Actions',
      render: (row) => (
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => onEdit(row.id)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => onDelete(row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [expandedRowId, setExpandedRowId] = React.useState<
    string | number | null
  >(null);

  return (
    <Table
      rows={rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)} // basic client-side pagination
      columns={columns}
      getRowId={(row) => row.id}
      enablePagination
      enableExpansion
      enableHighlight
      enableHover
      page={page}
      rowsPerPage={rowsPerPage}
      totalCount={rows.length}
      onPageChange={setPage}
      onRowsPerPageChange={setRowsPerPage}
      expandedRowId={expandedRowId}
      onExpandToggle={(rowId) =>
        setExpandedRowId((prev) => (prev === rowId ? null : rowId))
      }
      renderExpandedContent={(row) => (
        <Box sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
          <Typography variant="subtitle1" gutterBottom>
            Course Statistics
          </Typography>
          <Typography variant="body2">
            Enrolled Students: {row.enrolledCount}
          </Typography>
          <Typography variant="body2">
            Assignments: {row.assignmentCount}
          </Typography>
          <Typography variant="body2">Quizzes: {row.quizCount}</Typography>
          <Typography variant="body2">Semester: {row.semester}</Typography>
          <Typography variant="body2">Year: {row.year}</Typography>
        </Box>
      )}
    />
  );
};

export default CourseTable;
