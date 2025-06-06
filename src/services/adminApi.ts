import { apiSlice } from "./apiSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminUsers: builder.query<any[], void>({
      query: () => 'admin/users',
      providesTags: ['Users']
    }),
    getAdminUserById: builder.query({
      query: (id) => `admin/users/${id}/profile`,
    }),
    addAdminUser: builder.mutation<any, { email: string; role: string, organization_id: number }>({
      query: (user) => ({
        url: 'admin/users',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Users'],
    }),
    activateAdminUser: builder.mutation<any, number>({
      query: (userId) => ({ 
        url: `admin/users/${userId}/activate`,
        method: "PATCH",
      }),
      invalidatesTags: ['Users']
    }),
    deactivateAdminUser: builder.mutation<any, number>({
      query: (userId) => ({
        url: `admin/users/${userId}/deactivate`,
        method: "PATCH",
      }),
      invalidatesTags: ['Users']
    }),
    getAdminOrganizations: builder.query<any[], void>({
      query: () => 'admin/organizations',
      providesTags: ['Organizations']   
    }),
    createAdminOrganization: builder.mutation<any, {
      name: string;
      organization_code: string;
      settings: { 
        font: string;
        primaryLightColor: string;
        primaryDarkColor: string;
        secondaryLightColor: string;
        secondaryDarkColor: string;
      };
    }>({
      query: (org) => ({
        url: 'admin/organizations',
        method: 'POST',
        body: org,
      }), 
      invalidatesTags: ['Organizations'],
    }),
    deleteOrganization: builder.mutation<any, number>({
        query: (orgId) => ({
          url: `admin/organizations/${orgId}`,
          method: 'DELETE'
        }),
        invalidatesTags: ['Organizations']
    }),
    updateAdminOrganization: builder.mutation<any, {
      id: number,
      name: string;
      organization_code: string;
      settings: { 
        font: string;
        primaryLightColor: string;
        primaryDarkColor: string;
        secondaryLightColor: string;
        secondaryDarkColor: string;
      };
    }>({
      query: ({ id, ...org }) => ({
        url: `admin/organizations/${id}`,
        method: 'POST',
        body: org,
      }), 
      invalidatesTags: ['Organizations'],
    })
    
  }),
})

export const {
  useGetAdminUsersQuery,
  useGetAdminUserByIdQuery,
  useAddAdminUserMutation,
  useGetAdminOrganizationsQuery,
  useCreateAdminOrganizationMutation,
  useActivateAdminUserMutation,
  useDeactivateAdminUserMutation,
} = adminApi;
