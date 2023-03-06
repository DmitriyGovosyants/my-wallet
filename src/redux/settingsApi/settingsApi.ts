import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ISettings {
  mainCurrency: string;
}

export const settingsApi = createApi({
  reducerPath: 'settingsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8088/api/settings',
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Settings'],
  endpoints: builder => ({
    getSettings: builder.query<ISettings, void>({
      query: () => ``,
      providesTags: ['Settings'],
      transformResponse:
        (response: {  settings: ISettings }) => response.settings,
    }),
    setCurrency: builder.mutation({
      query: currency => ({
        url: '',
        method: 'PUT',
        body: currency,
      }),
      invalidatesTags: ['Settings']
    })
  }),
});

export const {
  useGetSettingsQuery,
  useSetCurrencyMutation,
} = settingsApi;
