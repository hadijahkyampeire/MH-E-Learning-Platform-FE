import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string; user: any, message?: string | null },
      { email: string; password: string; organization_id?: number | null }
    >({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    loginAdmin: builder.mutation<
      { token: string; user: any, message?: string | null },
      { email: string; security_answer: string }
    >({
      query:(credentials) => ({
        url: '/login/security',
        method: 'POST',
        body: credentials,  
      })
    })
  })
  });

export const { useLoginMutation, useLoginAdminMutation } = authApi;