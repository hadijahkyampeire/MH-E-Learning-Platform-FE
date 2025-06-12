import { apiSlice } from './apiSlice';

export interface CourseRequest {
  name: string;
  course_code: string;
  semester: string;
  month: number;
  year: number;
  organization_id?: number;
  user_id?: number;
  is_completed?: boolean;
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

export interface Course {
  id: number;
  name: string;
  course_code: string;
  semester: string;
  month: number;
  year: number;
  is_completed: boolean;
  instructorEmail: string;
  organizationName: string;
  enrollment_count: number;
  assignment_type_counts: {
    homework?: number;
    quiz?: number;
    exam?: number;
    project?: number;
  };
  [key: string]: any;
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
    addCourse: builder.mutation<CourseRequest, Partial<Course>>({
      query: (course) => ({
        url: '/courses',
        method: 'POST',
        body: course,
      }),
      invalidatesTags: ['Courses'],
    }),
    updateCourse: builder.mutation<CourseRequest, { id: number | string; data: Partial<Course> }>({
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
     getEnrolledStudents: builder.query<EnrollmentResponse[], number | string>({
          query: (courseId) => `/courses/${courseId}/students/enrolled`,
          providesTags: ['Courses'],
        }),
        getUnenrolledStudents: builder.query<EnrollmentResponse[], number | string>({
          query: (courseId) => `/courses/${courseId}/students/unenrolled`,
          providesTags: ['Courses'],
        }),
  }),
});


export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useAddCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useGetEnrolledStudentsQuery,
  useGetUnenrolledStudentsQuery,
} = coursesApi;
