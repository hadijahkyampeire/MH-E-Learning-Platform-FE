import React from 'react';
import { Button, Box, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import Table, { type Column } from '../../ui/Table/Table';
import ActionMenu from '../ActionMenu';
import { months } from '../../../common/months';

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
  onDuplicate: (course: CourseRow) => void;
  onComplete: (course: CourseRow) => void;
};

const CourseTable: React.FC<Props> = ({
  rows,
  onEdit,
  onDelete,
  onComplete,
  onDuplicate,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

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
          1: 'First',
          2: 'Second',
          3: 'Summer',
        };
        return semMap[row.semester as 1 | 2 | 3];
      },
    },
    {
      id: 'month',
      label: 'Month',
      render: (row) => months[row.month as keyof typeof months] || 'N/A',
    },
    { id: 'year', label: 'Year' },
    {
      id: 'is_completed',
      label: 'Status',
      render: (row) => {
        const status = row.is_completed ? 'Completed' : 'Ongoing';
        const color = row.is_completed ? theme.palette?.secondary.main : theme.palette?.primary.main;

        return (
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: color,
              }}
            />
            <Typography variant="body2">{status}</Typography>
          </Box>
        );
      },
    },
    {
      id: 'actions',
      label: 'Actions',
      render: (row) => (
        <ActionMenu
          row={row}
          onEdit={onEdit}
          onDelete={onDelete}
          onDuplicate={(course) => onDuplicate(course)}
          onComplete={(course) => onComplete(course)}
        />
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
      rows={rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
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
      getRowSx={(row) =>
        row.is_completed
          ? { backgroundColor: theme.palette?.custom?.activeMenu }
          : {}
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
