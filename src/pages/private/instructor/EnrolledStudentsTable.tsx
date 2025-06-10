import { useState, useMemo } from 'react';
import { Box, TextField, MenuItem } from '@mui/material';
import Table from '../../../components/ui/Table/Table';
import { type EnrollmentResponse } from '../../../services/enrollmentApi';

const enrollments: EnrollmentResponse[] = [
  {
    id: 101,
    status: 'active',
    grade: 'A',
    email: 'alice.smith@example.com',
    total_score: 92,
    firstName: 'Alice',
    lastName: 'Smith',
    employeeId: 'EMP001',
  },
  {
    id: 102,
    status: 'dropped',
    grade: 'F',
    email: 'bob.johnson@example.com',
    total_score: 35,
    firstName: 'Bob',
    lastName: 'Johnson',
    employeeId: 'EMP002',
  },
  {
    id: 103,
    status: 'passed',
    grade: 'B+',
    email: 'carol.brown@example.com',
    total_score: 85,
    firstName: 'Carol',
    lastName: 'Brown',
    employeeId: 'EMP003',
  },
  {
    id: 104,
    status: 'failed',
    grade: 'D',
    email: 'david.lee@example.com',
    total_score: 52,
    firstName: 'David',
    lastName: 'Lee',
    employeeId: 'EMP004',
  },
  {
    id: 105,
    status: 'active',
    grade: 'A+',
    email: 'eva.green@example.com',
    total_score: 98,
    firstName: 'Eva',
    lastName: 'Green',
    employeeId: 'EMP005',
  },
];

function EnrolledStudentsTable({ rows }: { rows: any[] }) {
  const dataToShow = rows && rows.length > 0 ? rows : enrollments;
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  console.log(rows, 'rr', dataToShow);

  const safeRows = dataToShow.map((r) => ({
    firstName: r.firstName || '—',
    lastName: r.lastName || '',
    email: r.email || '—',
    employeeId: r.employeeId || '—',
    grade: r.grade || '',
    total_score: r.total_score ?? 0,
    status: r.status || 'unknown',
  }));

  const filteredRows = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return safeRows.filter((r) => {
      const matchesSearch =
        !term ||
        r.firstName.toLowerCase().includes(term) ||
        r.lastName.toLowerCase().includes(term) ||
        r.email.toLowerCase().includes(term) ||
        r.employeeId.toLowerCase().includes(term);

      const matchesGrade = gradeFilter ? r.grade === gradeFilter : true;
      const matchesStatus = statusFilter ? r.status === statusFilter : true;

      return matchesSearch && matchesGrade && matchesStatus;
    });
  }, [searchTerm, gradeFilter, statusFilter, safeRows]);

  console.log(filteredRows, 'filteredRows');
  const columns = [
    {
      id: 'employeeId',
      label: 'Student ID',
      render: (r: any) => r.employeeId || '—',
    },
    {
      id: 'name',
      label: 'Name',
      render: (r: any) =>
        r.firstName && r.lastName ? `${r.firstName} ${r.lastName}` : '—',
    },
    { id: 'email', label: 'Email', render: (r: any) => r.email || '—' },
    {
      id: 'grade',
      label: 'Grade',
      render: (r: any) => {
        const grade = r.grade.toUpperCase();

        const gradeColorMap: Record<string, string> = {
          'A+': '#388E3C',
          A: '#4CAF50',
          'B+': '#7CB342',
          B: '#9CCC65',
          C: '#FFB74D',
          D: '#FF8A65',
          F: '#E53935',
        };

        return (
          <span
            style={{
              fontWeight: 600,
              color: gradeColorMap[grade] || '#9E9E9E',
            }}
          >
            {grade || '—'}
          </span>
        );
      },
    },
    {
      id: 'total_score',
      label: 'Total Score',
      render: (r: any) => (
        <span style={{ fontWeight: 600 }}>{r.total_score ?? '—'}</span>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      render: (r: any) => {
        const status = r.status.toLowerCase();

        const colorMap: Record<string, string> = {
          active: '#64B5F6',
          dropped: '#FFD54F',
          failed: '#E57373',
          passed: '#81C784',
        };

        return (
          <span
            style={{
              textTransform: 'uppercase',
              fontWeight: 600,
              color: colorMap[status] || '#9E9E9E',
            }}
          >
            {r.status || 'Not Started'}
          </span>
        );
      },
    },
  ];

  return (
    <>
      <Box display="flex" gap={2} mb={2} alignItems="center">
        <TextField
          fullWidth
          label="Search by name, email, or ID"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <TextField
          fullWidth
          select
          label="Grade"
          variant="outlined"
          size="small"
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {['A+', 'A', 'B+', 'B', 'C', 'D', 'F'].map((grade) => (
            <MenuItem key={grade} value={grade}>
              {grade}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          select
          label="Status"
          variant="outlined"
          size="small"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {['active', 'dropped', 'passed', 'failed'].map((status) => (
            <MenuItem key={status} value={status}>
              {status.toUpperCase()}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Table
        rows={filteredRows}
        columns={columns}
        enablePagination
        page={0}
        rowsPerPage={10}
        totalCount={filteredRows.length}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </>
  );
}
export default EnrolledStudentsTable;
