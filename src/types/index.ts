export const roleToPath: Record<number, string> = { 
  1: '/admin',   
  2: '/instructor',     
  3: '/student',
};

export type QuestionType = 'mcq' | 'fill' | 'short' | 'long';

export type QuizQuestion = {
  id: string;
  type: QuestionType;
  prompt: string;
  options?: string[]; // for MCQ
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