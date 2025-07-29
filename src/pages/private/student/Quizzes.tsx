import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ResponsiveTable, {
  type Column,
} from '../../../components/ui/Table/ResponsiveTable';

export type QuestionType = 'mcq' | 'fill' | 'short' | 'long';

export type QuizQuestion = {
  id: string;
  type: QuestionType;
  prompt: string;
  options?: string[];
  correctAnswer?: string | string[];
  modelAnswer?: string;
  marks: number;
};

export type Quiz = {
  id: string;
  title: string;
  description?: string;
  durationMinutes: number;
  dueDate: string;
  isClosed: boolean;
  questions: QuizQuestion[];
};

const QUIZ_STORAGE_KEY = 'quizzes';
const ANSWER_KEY = 'quiz-answers';
const SCORE_KEY = 'quiz-scores';

function Quizzes() {
  const { id: courseId } = useParams();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const navigate = useNavigate();

  console.log(quizzes, 'qizz');

  useEffect(() => {
    const stored = localStorage.getItem(QUIZ_STORAGE_KEY);
    console.log(stored, 'st--qiz');
    if (stored) {
      const all = JSON.parse(stored) as Quiz[];
      // const now = new Date();
      // const visible = all.filter(
      //   (q) => q.isClosed && new Date(q.dueDate) > now
      // );
      setQuizzes(all);
    }
  }, []);

  const getQuizStatus = (quizId: string) => {
    const answers = localStorage.getItem(`${ANSWER_KEY}-${quizId}`);
    const score = localStorage.getItem(`${SCORE_KEY}-${quizId}`);

    if (score) {
      return { status: 'Returned', score: score, isReturned: true };
    } else if (answers) {
      return { status: 'Submitted', score: '-', isReturned: false };
    } else {
      return { status: 'Not Started', score: '-', isReturned: false };
    }
  };

  const columns: Column<Quiz>[] = [
    {
      id: 'title',
      label: 'Quiz Name',
      render: (quiz) => {
        const quizStatus = getQuizStatus(quiz.id);
        return (
          <span
            style={{
              color: quizStatus.isReturned ? '#2e7d32' : '#1976d2',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontWeight: quizStatus.isReturned ? 'bold' : 'normal',
            }}
            onClick={() =>
              navigate(`/student/courses/${courseId}/quizzes/${quiz.id}`)
            }
          >
            {quiz.title}
          </span>
        );
      },
    },
    { id: 'description', label: 'Description' },
    {
      id: 'dueDate',
      label: 'Due Date',
      render: (quiz) => new Date(quiz.dueDate).toLocaleString(),
    },
    {
      id: 'durationMinutes',
      label: 'Duration (min)',
      render: (quiz) => quiz.durationMinutes,
    },
    {
      id: 'status',
      label: 'Status',
      render: (quiz) => {
        const quizStatus = getQuizStatus(quiz.id);
        return (
          <span
            style={{
              color: quizStatus.isReturned ? '#2e7d32' : 'inherit',
              fontWeight: quizStatus.isReturned ? 'bold' : 'normal',
            }}
          >
            {quizStatus.status}
          </span>
        );
      },
    },
    {
      id: 'score',
      label: 'Score',
      render: (quiz) => {
        const quizStatus = getQuizStatus(quiz.id);
        return (
          <span
            style={{
              color: quizStatus.isReturned ? '#2e7d32' : 'inherit',
              fontWeight: quizStatus.isReturned ? 'bold' : 'normal',
            }}
          >
            {quizStatus.score}
          </span>
        );
      },
    },
  ];

  return (
    <Box p={2}>
      <Typography variant="h5" mb={2}>
        Available Quizzes
      </Typography>
      <ResponsiveTable
        rows={quizzes}
        columns={columns}
        getRowId={(row) => row.id}
        getRowSx={(quiz) => {
          const quizStatus = getQuizStatus(quiz.id);
          return quizStatus.isReturned ? { backgroundColor: '#f1f8e9' } : {};
        }}
      />
      {quizzes.length === 0 && (
        <Typography>No active quizzes available right now.</Typography>
      )}
    </Box>
  );
}

export default Quizzes;
