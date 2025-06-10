import { apiSlice } from "./apiSlice";

export const organizationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizations: builder.query<any[], void>({
      query: () => '/organizations',
      providesTags: ['Organizations']
    })
  })
});

export const {
  useGetOrganizationsQuery,
} = organizationsApi;