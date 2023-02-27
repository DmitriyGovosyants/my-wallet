import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Settings {
  settings: {
    bills: string[];
    categories: [];
    filter: {
      bill: string;
      type: string;
      date: string;
    };
    mainCurrency: string;
  }
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8088/api',
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Settings', 'Currency'],
  endpoints: builder => ({
    getSettings: builder.query<Settings, void>({
      query: () => `/user/settings`,
      providesTags: ['Settings'],
    }),
    setCurrency: builder.mutation({
      query: currency => ({
        url: '/user/currency',
        method: 'PATCH',
        body: currency,
      }),
      invalidatesTags: ['Currency']
    })
  }),
});

export const {
  useGetSettingsQuery,
  useSetCurrencyMutation,
} = userApi;
