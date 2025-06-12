import { apiSlice } from "./apiSlice";

export interface Resource {
  id: number;
  course_id: number;
  title: string;
  description?: string;
  file: { filename: string, url: string, content_type: string };
  created_at: string;
  updated_at: string;
  visible: boolean;
}

export interface ResourceRequest {
  title: string;
  description?: string;
  file: File;
}

const resourcesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResources: builder.query<Resource[], number | string>({
      query: (courseId) => `/courses/${courseId}/resources`,
      providesTags: (result, error, courseId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Resources' as const, id })),
              { type: 'Resources', id: courseId },
            ]
          : [{ type: 'Resources', id: courseId }],
    }),
    getResource: builder.query<Resource, { courseId: number | string; id: number | string }>({
      query: ({ courseId, id }) => `/courses/${courseId}/resources/${id}`,
      providesTags: (result, error, { courseId, id }) => [
        { type: 'Resources', id },
        { type: 'Resources', id: courseId },
      ],
    }),
    addResource: builder.mutation<Resource, { courseId: number | string; data: ResourceRequest }>({
      query: ({ courseId, data }) => ({
        url: `/courses/${courseId}/resources`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { courseId }) => [
        { type: 'Resources', id: courseId },
        { type: 'Resources', id: 'LIST' },
      ],
    }),
    updateResource: builder.mutation<Resource, { courseId: number | string; id: number | string; data: Partial<ResourceRequest> }>({
      query: ({ courseId, id, data }) => ({
        url: `/courses/${courseId}/resources/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { courseId, id }) => [
        { type: 'Resources', id },
        { type: 'Resources', id: courseId },
        { type: 'Resources', id: 'LIST' },
      ],
    }),
    deleteResource: builder.mutation<{ success: boolean }, { courseId: number | string; id: number | string }>({
      query: ({ courseId, id }) => ({
        url: `/courses/${courseId}/resources/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { courseId, id }) => [
        { type: 'Resources', id },
        { type: 'Resources', id: courseId },
        { type: 'Resources', id: 'LIST' },
      ],
    }),
  }),
});
export const {
  useGetResourcesQuery,
  useGetResourceQuery,
  useAddResourceMutation,
  useUpdateResourceMutation,
  useDeleteResourceMutation,
} = resourcesApi;