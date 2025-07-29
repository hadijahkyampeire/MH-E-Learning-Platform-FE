import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Chip,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { type Quiz } from '../../../types';

const QUIZ_STORAGE_KEY = 'quizzes';
const ANSWER_KEY = 'quiz-answers';
const SCORE_KEY = 'quiz-scores';

const StudentTakeQuiz = () => {
  const { id: courseId, quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isViewOnly, setIsViewOnly] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [score, setScore] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(QUIZ_STORAGE_KEY);
    if (!stored) return;

    const quizzes = JSON.parse(stored) as Quiz[];
    const found = quizzes.find((q) => q.id === quizId);
    if (!found) return;

    setQuiz(found);

    const savedAnswers = localStorage.getItem(`${ANSWER_KEY}-${quizId}`);
    const savedScore = localStorage.getItem(`${SCORE_KEY}-${quizId}`);

    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
      // If there are saved answers, the quiz has been started
      setHasStarted(true);
      setTimeLeft(found.durationMinutes * 60);
    }

    if (savedScore) {
      setScore(savedScore);
    }
  }, [quizId]);

  // Countdown timer - only runs if quiz has started
  useEffect(() => {
    if (!hasStarted || timeLeft <= 0) {
      if (timeLeft <= 0 && hasStarted) {
        setIsViewOnly(true);
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, hasStarted]);

  // Auto-save answers
  useEffect(() => {
    if (quiz && hasStarted && !isViewOnly) {
      localStorage.setItem(`${ANSWER_KEY}-${quiz.id}`, JSON.stringify(answers));
    }
  }, [answers, quiz, isViewOnly, hasStarted]);

  const handleStartQuiz = () => {
    setHasStarted(true);
    setTimeLeft(quiz!.durationMinutes * 60);
  };

  const handleChange = (questionId: string, value: string) => {
    if (isViewOnly || !hasStarted) return; // Prevent changes in view-only mode or before starting
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    // Save final answers
    if (quiz) {
      localStorage.setItem(`${ANSWER_KEY}-${quiz.id}`, JSON.stringify(answers));
    }
    navigate(`/student/courses/${courseId}/quizzes`);
  };

  if (!quiz) return <Typography>Loading...</Typography>;

  return (
    <Box p={2}>
      <Button
        variant="outlined"
        sx={{ mb: 2 }}
        onClick={() => navigate(`/student/courses/${courseId}/quizzes`)}
      >
        Back to List
      </Button>

      <Typography variant="h5" gutterBottom>
        {quiz.title}
      </Typography>
      <Typography>{quiz.description}</Typography>

      {score && (
        <Box mt={2} mb={2}>
          <Chip
            label={`Score: ${score}`}
            color="success"
            variant="filled"
            sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}
          />
        </Box>
      )}

      {hasStarted && (
        <Typography variant="body2" mb={2}>
          Time left: {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, '0')}
        </Typography>
      )}

      {isViewOnly && (
        <Typography variant="h6" color="warning.main" mb={2}>
          Time's up! This quiz is now in view-only mode.
        </Typography>
      )}

      {!hasStarted ? (
        <Box mt={4}>
          <Typography variant="h6" mb={2}>
            Quiz Duration: {quiz.durationMinutes} minutes
          </Typography>
          <Button variant="contained" size="large" onClick={handleStartQuiz}>
            Start Quiz
          </Button>
        </Box>
      ) : (
        <>
          {quiz.questions.map((q, i) => (
            <Box key={q.id} mt={3}>
              <Typography gutterBottom>
                {i + 1}. {q.prompt}
              </Typography>

              {q.type === 'mcq' && (
                <RadioGroup
                  value={answers[q.id] || ''}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                >
                  {q.options?.map((opt, idx) => (
                    <FormControlLabel
                      key={idx}
                      value={opt}
                      control={<Radio disabled={isViewOnly} />}
                      label={`${String.fromCharCode(65 + idx)}. ${opt}`}
                    />
                  ))}
                </RadioGroup>
              )}

              {['fill', 'short', 'long'].includes(q.type) && (
                <TextField
                  fullWidth
                  margin="dense"
                  multiline={q.type === 'long'}
                  rows={q.type === 'long' ? 4 : 1}
                  placeholder="Your answer"
                  value={answers[q.id] || ''}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                  disabled={isViewOnly}
                />
              )}
            </Box>
          ))}

          <Button
            variant="contained"
            sx={{ mt: 4 }}
            onClick={handleSubmit}
            disabled={timeLeft <= 0}
          >
            {isViewOnly ? 'Back to List' : 'Submit Now'}
          </Button>
        </>
      )}
    </Box>
  );
};

export default StudentTakeQuiz;
