import React, { useState } from 'react';
import {
  Button,
  Box,
  Typography,
  Link,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import Table, { type Column } from '../../components/ui/Table/Table';

export interface CourseRow {
  id: number;
  name: string;
  course_code: string;
  semester: string;
  month: number;
  year: number;
  is_completed: boolean;
  instructorEmail: string;
  organizationName: string;
  enrollment_count: number;
  assignment_type_counts: {
    homework?: number;
    quiz?: number;
    exam?: number;
    project?: number;
  };
  [key: string]: any;
}

type Props = {
  rows: CourseRow[];
  onEdit: (row: CourseRow) => void;
  onDelete: (courseId: number) => void;
};

const CourseTable: React.FC<Props> = ({ rows, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuRow, setMenuRow] = useState<CourseRow | null>(null);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    row: CourseRow
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRow(null);
  };
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
    {
      id: 'semester',
      label: 'Semester',
      render: (row) => {
        console.log('Row:', row);
        const semMap = {
          1: 'First Semester',
          2: 'Second Semester',
          3: 'Summer Semester',
        };
        return semMap[row.semester as 1 | 2 | 3];
      },
    },
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
        <>
          <IconButton onClick={(e) => handleMenuOpen(e, row)} size="small">
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
                onEdit(menuRow!);
              }}
              color="primary"
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                if (menuRow) {
                  onDelete(menuRow.id);
                }
              }}
              color="error"
            >
              Delete
            </MenuItem>
            <MenuItem onClick={() => {}}>Mark as Complete</MenuItem>
          </Menu>
        </>
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
        <Box sx={{ p: 2, backgroundColor: '#f9f9f9', borderRadius: 1 }}>
          <Typography color="text.secondary" fontSize={14} gutterBottom>
            Click the links for more details!
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 4,
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link
              component={RouterLink}
              to={`/instructor/courses/${row.id}/enrollments`}
              underline="hover"
              color="primary"
              fontWeight="500"
            >
              Enrolled Students: {row.enrollment_count || 0}
            </Link>

            <Link
              component={RouterLink}
              to={`/instructor/courses/${row.id}/assignments`}
              underline="hover"
              color="primary"
              fontWeight="500"
            >
              Assignments: {row.assignment_type_counts?.homework || 0}
            </Link>

            <Link
              component={RouterLink}
              to={`/instructor/courses/${row.id}/quizzes`}
              underline="hover"
              color="primary"
              fontWeight="500"
            >
              Quizzes: {row.assignment_type_counts?.quiz || 0}
            </Link>

            <Typography variant="body2">
              Exams: {row.assignment_type_counts?.exam || 0}
            </Typography>

            <Typography variant="body2">
              Projects: {row.assignment_type_counts?.project || 0}
            </Typography>
          </Box>
        </Box>
      )}
    />
  );
};

export default CourseTable;
