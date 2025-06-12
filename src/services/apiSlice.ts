import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURL = 'http://127.0.0.1:3000';

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});


const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);

  const error = (result as { error?: { status?: number; data?: { error?: string } } }).error;

  if (
    error?.status === 401 ||
    error?.data?.error === 'Token expired or invalid'
  ) {

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Users', 'Organizations', 'Courses', 'Enrollments', 'Assignments', 'Quizzes', 'Notifications', 'Resources'],
  endpoints: () => ({}),
});
