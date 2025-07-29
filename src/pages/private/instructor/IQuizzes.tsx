import { useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete,
  Edit,
  UploadFile,
  Code,
} from '@mui/icons-material';
import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import QuizBuilder from '../../../quiz-builder/QuizBuilder';
import Table, { type Column } from '../../../components/ui/Table/Table';
import MenuItem from '@mui/material/MenuItem';

type Quiz = {
  id: string;
  title: string;
  description?: string;
  durationMinutes: number;
  dueDate: string;
  isClosed: boolean;
  questions: QuizQuestion[];
  publish: boolean;
};

type QuizQuestion = {
  id: string;
  type: 'mcq' | 'short' | 'long' | 'fill';
  prompt: string;
  options?: string[];
  correctAnswer?: string | string[];
  modelAnswer?: string;
  marks: number;
};

function IQuizzes() {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [showBuilder, setShowBuilder] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [metadata, setMetadata] = useState({
    title: '',
    description: '',
    durationMinutes: 30,
    dueDate: new Date().toISOString().slice(0, 16), // default to now, ISO string for datetime-local
    publish: false,
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sortBy, setSortBy] = useState<'title' | 'dueDate'>('dueDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'done' | 'published' | 'unpublished'
  >('all');

  // Filtering
  const filteredQuizzes = quizzes.filter((quiz) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'done') return quiz.isClosed;
    if (statusFilter === 'published') return quiz.publish && !quiz.isClosed;
    if (statusFilter === 'unpublished') return !quiz.publish && !quiz.isClosed;
    return true;
  });

  // Sorting
  const sortedQuizzes = [...filteredQuizzes].sort((a, b) => {
    let cmp = 0;
    if (sortBy === 'title') {
      cmp = a.title.localeCompare(b.title);
    } else if (sortBy === 'dueDate') {
      cmp = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return sortOrder === 'asc' ? cmp : -cmp;
  });

  // Table columns
  const columns: Column<Quiz>[] = [
    {
      id: 'title',
      label: 'Title',
      sortable: true,
      render: (row) => (
        <Button
          variant="text"
          color="primary"
          onClick={() =>
            navigate(`/instructor/courses/${courseId}/quizzes/${row.id}/edit`)
          }
        >
          {row.title}
        </Button>
      ),
    },
    {
      id: 'description',
      label: 'Description',
      render: (row) => row.description || '-',
    },
    { id: 'durationMinutes', label: 'Duration (min)' },
    {
      id: 'dueDate',
      label: 'Due Date',
      render: (row) => new Date(row.dueDate).toLocaleString(),
      sortable: true,
    },
    {
      id: 'questions',
      label: 'Questions',
      render: (row) => row.questions.length,
    },
    {
      id: 'publish',
      label: 'Published',
      render: (row) => (row.publish ? 'Yes' : 'No'),
    },
    {
      id: 'isClosed',
      label: 'Done',
      render: (row) => (row.isClosed ? 'Yes' : 'No'),
    },
  ];

  const handleCreateQuiz = () => {
    if (!metadata.dueDate) {
      setSnackbar({
        open: true,
        message: 'Due date is required',
        severity: 'error',
      });
      return;
    }
    const newQuiz: Quiz = {
      id: uuidv4(),
      ...metadata,
      isClosed: false,
      questions: [],
    };
    setCurrentQuiz(newQuiz);
    setShowBuilder(true);
    setDialogOpen(false);
  };

  const handleSaveQuiz = (quiz: Quiz) => {
    const updated = [...quizzes, quiz];
    setQuizzes(updated);
    localStorage.setItem('quizzes', JSON.stringify(updated));
    setShowBuilder(false);
    setCurrentQuiz(null);
  };

  // Import JSON handler
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        setCurrentQuiz(parsed);
        setShowBuilder(true);
        setSnackbar({
          open: true,
          message: 'Quiz imported successfully!',
          severity: 'success',
        });
      } catch (err) {
        setSnackbar({
          open: true,
          message: 'Failed to import JSON: Invalid format',
          severity: 'error',
        });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Sample quiz loader
  const handleLoadSample = () => {
    // Use the same SAMPLE_QUIZ as in QuizBuilder
    const sample = {
      id: uuidv4(),
      title: 'Sample Quiz',
      description:
        'A sample quiz with various React web programming questions.',
      durationMinutes: 15,
      dueDate: new Date().toISOString().slice(0, 16),
      isClosed: false,
      publish: true,
      questions: [
        {
          id: uuidv4(),
          type: 'mcq',
          prompt:
            'Which hook is used to manage state in a functional React component?',
          options: ['useEffect', 'useState', 'useContext', 'useReducer'],
          correctAnswer: 'useState',
          marks: 1,
        },
        {
          id: uuidv4(),
          type: 'fill',
          prompt:
            'The virtual ____ is a concept used by React to optimize rendering.',
          correctAnswer: 'DOM',
          marks: 1,
        },
        {
          id: uuidv4(),
          type: 'short',
          prompt:
            'Name one way to pass data from a parent to a child component in React.',
          correctAnswer: 'props',
          modelAnswer: 'You can pass data from parent to child using props.',
          marks: 2,
        },
        {
          id: uuidv4(),
          type: 'long',
          prompt:
            'Explain the difference between controlled and uncontrolled components in React.',
          modelAnswer:
            'Controlled components have their state managed by React, typically via useState, while uncontrolled components store their own state internally (e.g., using refs).',
          marks: 3,
        },
      ],
    };
    setCurrentQuiz(sample);
    setShowBuilder(true);
    setSnackbar({
      open: true,
      message: 'Sample quiz loaded!',
      severity: 'success',
    });
  };

  useEffect(() => {
    const stored = localStorage.getItem('quizzes');
    if (stored) {
      setQuizzes(JSON.parse(stored));
    }
  }, []);

  return (
    <Box p={2}>
      <Typography variant="h5" mb={2}>
        Quizzes for Course ID: {courseId}
      </Typography>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <TextField
          select
          label="Filter by Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          size="small"
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="done">Done</MenuItem>
          <MenuItem value="published">Published</MenuItem>
          <MenuItem value="unpublished">Unpublished</MenuItem>
        </TextField>
        <TextField
          select
          label="Sort by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          size="small"
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="dueDate">Due Date</MenuItem>
          <MenuItem value="title">Name</MenuItem>
        </TextField>
        <Button
          variant="outlined"
          onClick={() => setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
        >
          {sortOrder === 'asc' ? 'Asc' : 'Desc'}
        </Button>
        <Box flex={1} />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() =>
            navigate(`/instructor/courses/${courseId}/quizzes/create`)
          }
          sx={{ ml: 'auto' }}
        >
          Create Quiz
        </Button>
      </Box>
      <Table
        rows={sortedQuizzes}
        columns={columns}
        getRowId={(row) => row.id}
        enablePagination
        page={0}
        rowsPerPage={10}
        totalCount={sortedQuizzes.length}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default IQuizzes;
