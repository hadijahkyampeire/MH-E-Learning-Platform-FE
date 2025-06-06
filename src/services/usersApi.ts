import { apiSlice } from "./apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrgUsers: builder.query<any[], void>({
      query: () => "/users",
      providesTags:['Users']
    }),
    getOrgUserById: builder.query({
      query: (id) => `/users/${id}/profile`,
    }),
    addOrgUser: builder.mutation<any, { email: string; role: string }>({
      query: (user) => ({
        url: `/users`,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Users'],
    }),
    updateOrgUser: builder.mutation<
      any,
      { id: number; email: string; role: number; active: boolean }
    >({
      query: ({ id, ...user }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: user,
      }),
      invalidatesTags: ['Users'],
    }),
    deactiveOrgUser: builder.mutation<any, number>({
      query: (id) => ({ 
        url: `/users/${id}/deactivate`,
        method: "PATCH",
      }), 
      invalidatesTags: ['Users']
    }),
    activateOrgUser: builder.mutation<any, number>({
      query: (id) => ({ 
        url: `/users/${id}/activate`,
        method: "PATCH",
      }),
      invalidatesTags: ['Users'] 
    })
  }),
}); 

export const {
  useGetOrgUsersQuery,
  useGetOrgUserByIdQuery,
  useAddOrgUserMutation,
  useUpdateOrgUserMutation,
  useDeactiveOrgUserMutation,
  useActivateOrgUserMutation
} = usersApi;
