import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IUser {
  email: string;
  name: string;
  password: string;
};

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
    getCurrent: builder.query<any, any>({
      query: () => `/current`,
      providesTags: ['Auth'],
    }),
    register: builder.mutation<any, IUser>({
      query: value => ({
        url: `/register`,
        method: 'POST',
        body: value,
      }),
      invalidatesTags: ['Auth'],
    }),
    login: builder.mutation<any, Omit<IUser, "name">>({
      query: value => ({
        url: `/login`,
        method: 'POST',
        body: value,
      }),
      invalidatesTags: ['Auth'],
    }),
    logout: builder.mutation<any, void>({
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
