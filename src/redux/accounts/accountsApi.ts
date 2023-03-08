import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IAccount {
  currency: string;
  icon: string;
  startBalance: number;
  startDate: string;
  title: string;
  transactions: string[] | [];
  _id: string;
};

export interface IAccountUpdate {
  accountID: string;
  body: Omit<IAccount, "_id">;
}

export const accountsApi = createApi({
  reducerPath: 'accountsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8088/api/accounts',
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Accounts'],
  endpoints: builder => ({
    getAccounts: builder.query<IAccount[], void>({
      query: () => ``,
      providesTags: ['Accounts'],
      transformResponse:
        (response: {  accounts: IAccount[] }) => response.accounts,
    }),
    addAccount: builder.mutation<any, Omit<IAccount, "_id">>({
      query: account => ({
        url: '',
        method: 'POST',
        body: account,
      }),
      invalidatesTags: ['Accounts']
    }),
    updateAccount: builder.mutation<any, IAccountUpdate>({
      query: ({ accountID, body}) => ({
        url: `/${accountID}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Accounts']
    }),
    deleteAccount: builder.mutation<any, string>({
      query: accountID => ({
        url: `/${accountID}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Accounts']
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useAddAccountMutation,
  useUpdateAccountMutation,
  useDeleteAccountMutation,
} = accountsApi;
