import api from './api';

export const loginUser = async (credentials: {
  email: string;
  password: string;
  organization_id?: number | null;
}) => {
  const response = await api.post('/login', credentials);
  return response.data;
};

export const loginAdmin = async (credentials: {
  security_answer: string;
  email: string;
}) => {
  const response = await api.post('/login/security', credentials);
  return response.data;
};