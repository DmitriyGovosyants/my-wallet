import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export enum transactionTypes {
  Expense = "expense",
  Revenue = "revenue",
};

export interface ITransaction {
  type: transactionTypes;
  category_id: string;
  account_id: string;
  date: string;
  value: number;
  comment: string | undefined;
  _id: string;
  createdAt: string;
};

export interface ITransactionUpdate {
  transactionID: string;
  body: Omit<ITransaction, "_id" | "createdAt">;
}

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8088/api/transactions',
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Transactions'],
  endpoints: builder => ({
    getTransactions: builder.query<ITransaction[], void>({
      query: () => ``,
      providesTags: ['Transactions'],
      transformResponse:
        (response: {  transactions: ITransaction[] }) => response.transactions,
    }),
    addTransaction: builder.mutation<any, Omit<ITransaction, "_id" | "createdAt">>({
      query: transaction => ({
        url: '',
        method: 'POST',
        body: transaction,
      }),
      invalidatesTags: ['Transactions']
    }),
    updateTransaction: builder.mutation<any, ITransactionUpdate>({
      query: ({ transactionID, body}) => ({
        url: `/${transactionID}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Transactions']
    }),
    deleteTransaction: builder.mutation<any, string>({
      query: transactionID => ({
        url: `/${transactionID}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Transactions']
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useAddTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionsApi;
