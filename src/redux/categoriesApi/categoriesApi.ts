import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { transactionTypes } from 'redux/transactionsApi/transactionsApi';

export interface ICategory {
  type: transactionTypes;
  title: string;
  icon: string;
  _id: string;
};

export interface ICategoryUpdate {
  categoryID: string;
  body: Omit<ICategory, "_id">;
}

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8088/api/categories',
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Categories'],
  endpoints: builder => ({
    getCategories: builder.query<ICategory[], void>({
      query: () => ``,
      providesTags: ['Categories'],
      transformResponse:
        (response: {  categories: ICategory[] }) => response.categories,
    }),
    addCategory: builder.mutation<any, Omit<ICategory, "_id">>({
      query: category => ({
        url: '',
        method: 'POST',
        body: category,
      }),
      invalidatesTags: ['Categories']
    }),
    updateCategory: builder.mutation<any, ICategoryUpdate>({
      query: ({ categoryID, body}) => ({
        url: `/${categoryID}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Categories']
    }),
    deleteCategory: builder.mutation<any, string>({
      query: categoryID => ({
        url: `/${categoryID}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories']
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
