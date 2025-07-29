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
  MenuItem,
  TextField,
  Typography,
  Tabs,
  Tab,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  UploadFile,
  Code,
  Preview,
} from '@mui/icons-material';
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Quiz, QuizQuestion, QuestionType } from './types';

type Props = {
  quiz: Quiz;
  onSave: (quiz: Quiz) => void;
};

const questionTypes: QuestionType[] = ['mcq', 'fill', 'short', 'long'];

const SAMPLE_QUIZ: Quiz = {
  id: 'sample-quiz',
  title: 'Sample Quiz',
  description: 'A sample quiz with various question types.',
  durationMinutes: 15,
  dueDate: new Date(Date.now() + 86400000).toISOString(),
  isClosed: false,
  questions: [
    {
      id: uuidv4(),
      type: 'mcq',
      prompt: 'What is the capital of France?',
      options: ['Berlin', 'London', 'Paris', 'Madrid'],
      correctAnswer: 'Paris',
      marks: 1,
    },
    {
      id: uuidv4(),
      type: 'fill',
      prompt: '______ is the largest planet in our solar system.',
      correctAnswer: 'Jupiter',
      marks: 1,
    },
    {
      id: uuidv4(),
      type: 'short',
      prompt: 'Name a programming language that runs in the browser.',
      correctAnswer: 'JavaScript',
      modelAnswer: 'JavaScript is the main programming language for browsers.',
      marks: 2,
    },
    {
      id: uuidv4(),
      type: 'long',
      prompt: 'Explain the process of photosynthesis.',
      modelAnswer:
        'Photosynthesis is the process by which green plants convert sunlight into energy.',
      marks: 3,
    },
  ],
};

const QuizBuilder = ({ quiz, onSave }: Props) => {
  const [localQuiz, setLocalQuiz] = useState<Quiz>(quiz);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  console.log('QuizBuilder initialized with quiz:', localQuiz);

  const [questionForm, setQuestionForm] = useState<QuizQuestion>({
    id: uuidv4(),
    type: 'mcq',
    prompt: '',
    options: [''],
    correctAnswer: '',
    modelAnswer: '',
    marks: 1,
  });

  const [tab, setTab] = useState(0); // 0: UI, 1: JSON
  const [jsonValue, setJsonValue] = useState<string>(
    JSON.stringify(quiz, null, 2)
  );
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpen = (index?: number) => {
    if (index !== undefined) {
      setEditingIndex(index);
      setQuestionForm({ ...localQuiz.questions[index] });
    } else {
      setEditingIndex(null);
      setQuestionForm({
        id: uuidv4(),
        type: 'mcq',
        prompt: '',
        options: [''],
        correctAnswer: '',
        modelAnswer: '',
        marks: 1,
      });
    }
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setEditingIndex(null);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setQuestionForm((prev) => ({
      ...prev,
      [name]: name === 'marks' ? parseInt(value) : value,
    }));
  };

  const handleOptionChange = (i: number, value: string) => {
    const updatedOptions = [...(questionForm.options ?? [])];
    updatedOptions[i] = value;
    setQuestionForm((prev) => ({
      ...prev,
      options: updatedOptions,
    }));
  };

  const addOption = () => {
    setQuestionForm((prev) => ({
      ...prev,
      options: [...(prev.options ?? []), ''],
    }));
  };

  const handleSaveQuestion = () => {
    let updatedQuestions;
    if (editingIndex !== null) {
      updatedQuestions = [...localQuiz.questions];
      updatedQuestions[editingIndex] = questionForm;
    } else {
      updatedQuestions = [...localQuiz.questions, questionForm];
    }
    const updatedQuiz = { ...localQuiz, questions: updatedQuestions };
    setLocalQuiz(updatedQuiz);
    handleClose();
  };

  const handleDelete = (index: number) => {
    const updated = [...localQuiz.questions];
    updated.splice(index, 1);
    setLocalQuiz((prev) => ({ ...prev, questions: updated }));
  };

  const handleCloseQuiz = () => {
    const closedQuiz = { ...localQuiz, isClosed: true };
    setLocalQuiz(closedQuiz);
    onSave(closedQuiz);
  };

  // Sync localQuiz -> JSON when switching to JSON tab
  const handleTabChange = (_: any, newValue: number) => {
    setTab(newValue);
    if (newValue === 1) {
      setJsonValue(JSON.stringify(localQuiz, null, 2));
      setJsonError(null);
    }
  };

  // Handle JSON editor changes
  const handleJsonChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setJsonValue(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value);
      setLocalQuiz(parsed);
      setJsonError(null);
    } catch (err: any) {
      setJsonError('Invalid JSON');
    }
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
        setLocalQuiz(parsed);
        setJsonValue(JSON.stringify(parsed, null, 2));
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
    // Reset file input
    e.target.value = '';
  };

  // Sample quiz loader
  const handleLoadSample = () => {
    setLocalQuiz(SAMPLE_QUIZ);
    setJsonValue(JSON.stringify(SAMPLE_QUIZ, null, 2));
    setSnackbar({
      open: true,
      message: 'Sample quiz loaded!',
      severity: 'success',
    });
  };

  return (
    <Box p={3} mt={2} sx={{ border: '1px solid #ccc', borderRadius: 2 }}>
      <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="UI Builder" icon={<Preview />} iconPosition="start" />
        <Tab label="JSON Schema" icon={<Code />} iconPosition="start" />
      </Tabs>
      {tab === 0 && (
        <>
          <Typography variant="subtitle1">{localQuiz.description}</Typography>
          <Typography variant="body2">
            Duration: {localQuiz.durationMinutes} mins
            <br />
            Due: {new Date(localQuiz.dueDate).toLocaleString()}
          </Typography>

          <Box mt={3}>
            <Typography variant="h6">Questions</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpen()}
              sx={{ mt: 1 }}
              disabled={localQuiz.isClosed}
            >
              Add Question
            </Button>

            <List>
              {localQuiz.questions.map((q, index) => (
                <ListItem
                  key={q.id}
                  secondaryAction={
                    !localQuiz.isClosed && (
                      <>
                        <IconButton onClick={() => handleOpen(index)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(index)}>
                          <Delete />
                        </IconButton>
                      </>
                    )
                  }
                >
                  <ListItemText
                    primary={
                      <>
                        <Typography variant="subtitle1">
                          {index + 1}. ({q.type.toUpperCase()}) {q.prompt}
                        </Typography>

                        {q.type === 'mcq' && q.options?.length && (
                          <Box ml={2} mt={1}>
                            {q.options.map((opt, i) => (
                              <Typography
                                key={i}
                                variant="body2"
                                sx={{
                                  fontWeight:
                                    q.correctAnswer === opt ? 'bold' : 'normal',
                                  color:
                                    q.correctAnswer === opt
                                      ? 'green'
                                      : 'text.secondary',
                                }}
                              >
                                {String.fromCharCode(65 + i)}. {opt}
                              </Typography>
                            ))}
                          </Box>
                        )}

                        {q.type === 'fill' && q.correctAnswer && (
                          <Typography
                            variant="body2"
                            color="green"
                            ml={2}
                            mt={1}
                          >
                            Correct: {q.correctAnswer}
                          </Typography>
                        )}

                        {q.type === 'short' && (
                          <Box ml={2} mt={1}>
                            {q.correctAnswer && (
                              <Typography variant="body2" color="green">
                                Correct: {q.correctAnswer}
                              </Typography>
                            )}
                            {q.modelAnswer && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Model Answer: {q.modelAnswer}
                              </Typography>
                            )}
                          </Box>
                        )}

                        {q.type === 'long' && q.modelAnswer && (
                          <Typography
                            variant="body2"
                            ml={2}
                            mt={1}
                            color="text.secondary"
                          >
                            Model Answer: {q.modelAnswer}
                          </Typography>
                        )}
                      </>
                    }
                    secondary={`Marks: ${q.marks}`}
                  />
                </ListItem>
              ))}
            </List>

            {!localQuiz.isClosed && localQuiz.questions.length > 0 && (
              <Button
                variant="outlined"
                color="warning"
                onClick={handleCloseQuiz}
                sx={{ mt: 2 }}
              >
                Close Quiz
              </Button>
            )}
          </Box>

          <Dialog
            open={dialogOpen}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>
              {editingIndex !== null ? 'Edit Question' : 'Add Question'}
            </DialogTitle>
            <DialogContent>
              <TextField
                select
                fullWidth
                margin="dense"
                label="Question Type"
                name="type"
                value={questionForm.type}
                onChange={handleFormChange}
              >
                {questionTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type.toUpperCase()}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                margin="dense"
                label="Prompt"
                name="prompt"
                value={questionForm.prompt}
                onChange={handleFormChange}
                multiline
              />

              {questionForm.type === 'mcq' && (
                <>
                  {questionForm.options?.map((opt, i) => (
                    <TextField
                      key={i}
                      fullWidth
                      margin="dense"
                      label={`Option ${i + 1}`}
                      value={opt}
                      onChange={(e) => handleOptionChange(i, e.target.value)}
                    />
                  ))}
                  <Button onClick={addOption} size="small" sx={{ mt: 1 }}>
                    Add Option
                  </Button>

                  <TextField
                    fullWidth
                    margin="dense"
                    label="Correct Answer"
                    name="correctAnswer"
                    value={questionForm.correctAnswer as string}
                    onChange={handleFormChange}
                  />
                </>
              )}

              {(questionForm.type === 'fill' ||
                questionForm.type === 'short') && (
                <TextField
                  fullWidth
                  margin="dense"
                  label="Correct Answer"
                  name="correctAnswer"
                  value={questionForm.correctAnswer as string}
                  onChange={handleFormChange}
                />
              )}

              {(questionForm.type === 'short' ||
                questionForm.type === 'long') && (
                <TextField
                  fullWidth
                  margin="dense"
                  label="Model Answer (optional)"
                  name="modelAnswer"
                  value={questionForm.modelAnswer}
                  onChange={handleFormChange}
                  multiline
                  rows={3}
                />
              )}

              <TextField
                fullWidth
                margin="dense"
                label="Marks"
                name="marks"
                type="number"
                value={questionForm.marks}
                onChange={handleFormChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant="contained" onClick={handleSaveQuestion}>
                Save Question
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
      {tab === 1 && (
        <Box>
          <TextField
            label="Quiz JSON Schema"
            multiline
            minRows={16}
            fullWidth
            value={jsonValue}
            onChange={handleJsonChange}
            error={!!jsonError}
            helperText={
              jsonError ||
              'Edit the quiz JSON directly. Changes will reflect in the UI.'
            }
            sx={{ fontFamily: 'monospace', mt: 2 }}
          />
        </Box>
      )}
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

export default QuizBuilder;
