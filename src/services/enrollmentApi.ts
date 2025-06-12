import { apiSlice } from './apiSlice';

export interface Enrollment {
  id: number;
  user_id: number;
  course_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface EnrollmentResponse {
  id: number;
  status: string;
  grade: string;
  email: string;
  total_score: number;
  firstName?: string;
  lastName?: string;
  user_id?: number;
  course_id?: number;
  employeeId?: string;
}
export interface EnrollmentRequest {
  user_id: number;
  course_id: number;
}

export const enrollmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEnrollments: builder.query<EnrollmentResponse[], number | string>({
      query: (courseId) => `/courses/${courseId}/enrollments`,
      providesTags: ['Enrollments'],
    }),

    getEnrollment: builder.query<EnrollmentResponse, { courseId: number | string; id: number | string }>({
      query: ({ courseId, id }) => `/courses/${courseId}/enrollments/${id}`,
    }),

    addEnrollment: builder.mutation<Enrollment, { courseId: number | string; data: EnrollmentRequest }>({
      query: ({ courseId, data }) => ({
        url: `/courses/${courseId}/enrollments`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Enrollments'],
    }),

    updateEnrollment: builder.mutation<Enrollment, { courseId: number | string; id: number | string; data: Partial<EnrollmentRequest> }>({
      query: ({ courseId, id, data }) => ({
        url: `/courses/${courseId}/enrollments/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Enrollments'],
    }),

    deleteEnrollment: builder.mutation<{ success: boolean }, { courseId: number | string; id: number | string }>({
      query: ({ courseId, id }) => ({
        url: `/courses/${courseId}/enrollments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Enrollments'],
    }),

    bulkCreateEnrollments: builder.mutation<
      Enrollment[],
      { courseId: number | string; data: EnrollmentRequest[] }
    >({
      query: ({ courseId, data }) => ({
        url: `/courses/${courseId}/enrollments/bulk`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Enrollments'],
    }),
  }),
});

export const {
  useGetEnrollmentsQuery,
  useGetEnrollmentQuery,
  useAddEnrollmentMutation,
  useUpdateEnrollmentMutation,
  useDeleteEnrollmentMutation,
  useBulkCreateEnrollmentsMutation,
} = enrollmentsApi;
