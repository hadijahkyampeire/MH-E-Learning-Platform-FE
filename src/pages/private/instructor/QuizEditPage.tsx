import { useState, useRef, useEffect } from 'react';
import { Box, Button, Snackbar, Alert } from '@mui/material';
import { UploadFile, Code } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import QuizBuilder from '../../../quiz-builder/QuizBuilder';
import type { Quiz } from '../../../quiz-builder/types';
import { useParams, useNavigate } from 'react-router-dom';

const SAMPLE_QUIZ: Quiz = {
  id: uuidv4(),
  title: 'Sample Quiz',
  description: 'A sample quiz with various React web programming questions.',
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

const QuizEditPage = () => {
  const { id: courseId, quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('quizzes');
    if (stored) {
      const quizzes: Quiz[] = JSON.parse(stored);
      const found = quizzes.find((q) => q.id === quizId);
      if (found) setQuiz(found);
    }
  }, [quizId]);

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        setQuiz(parsed);
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

  const handleLoadSample = () => {
    setQuiz(SAMPLE_QUIZ);
    setSnackbar({
      open: true,
      message: 'Sample quiz loaded!',
      severity: 'success',
    });
  };

  if (!quiz) return <Box p={3}>Loading...</Box>;

  return (
    <Box p={3}>
      <Box display="flex" gap={2} mb={2}>
        <Button
          variant="outlined"
          startIcon={<UploadFile />}
          onClick={() => fileInputRef.current?.click()}
        >
          Import JSON
        </Button>
        <input
          type="file"
          accept="application/json"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImportJson}
        />
        <Button
          variant="outlined"
          startIcon={<Code />}
          onClick={handleLoadSample}
        >
          Sample Quiz
        </Button>
      </Box>
      <QuizBuilder
        quiz={quiz}
        onSave={(q) => {
          // Update in localStorage
          const stored = localStorage.getItem('quizzes');
          let quizzes: Quiz[] = [];
          if (stored) quizzes = JSON.parse(stored);
          const idx = quizzes.findIndex((qq) => qq.id === quizId);
          if (idx !== -1) {
            quizzes[idx] = q;
          } else {
            quizzes.push(q);
          }
          localStorage.setItem('quizzes', JSON.stringify(quizzes));
          setSnackbar({
            open: true,
            message: 'Quiz updated!',
            severity: 'success',
          });
          navigate(`/instructor/courses/${courseId}/quizzes`);
        }}
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
};

export default QuizEditPage;
