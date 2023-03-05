import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8088/api/auth',
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Auth'],
  endpoints: builder => ({
    getCurrent: builder.query({
      query: () => `/current`,
      providesTags: ['Auth'],
    }),
    register: builder.mutation({
      query: value => ({
        url: `/register`,
        method: 'POST',
        body: value,
      }),
      invalidatesTags: ['Auth'],
    }),
    login: builder.mutation({
      query: value => ({
        url: `/login`,
        method: 'POST',
        body: value,
      }),
      invalidatesTags: ['Auth'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/logout`,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useGetCurrentQuery,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
} = authApi;
