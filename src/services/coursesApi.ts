import { apiSlice } from './apiSlice';

export interface Course {
  id: number;
  name: string;
  course_code: string;
  semester: string;
  month: number;
  year: number;
  is_completed: boolean;
  organization_id?: number;
  user_id?: number;
  enrolledCount?: number;
  assignmentCount?: number;
  quizCount?: number;
}

export interface CourseResponse {
  courses: Course[];
  total: number;
}

export const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query<Course[], void>({
      query: () => '/courses',
      providesTags: ['Courses'],
    }),
    getCourse: builder.query<Course, string>({
      query: (id) => `/courses/${id}`,
    }),
    addCourse: builder.mutation<Course, Partial<Course>>({
      query: (course) => ({
        url: '/courses',
        method: 'POST',
        body: course,
      }),
      invalidatesTags: ['Courses'],
    }),
    updateCourse: builder.mutation<Course, { id: number | string; data: Partial<Course> }>({
      query: ({ id, data }) => ({
        url: `/courses/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Courses'],
    }),
    deleteCourse: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Courses'],
    }),
  }),
});


export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useAddCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = coursesApi;
