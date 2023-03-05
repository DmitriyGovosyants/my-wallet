import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export enum categoryTypes {
  Expense = "expense",
  Revenue = "revenue",
};

export interface ICategory {
  type: categoryTypes;
  title: string;
  icon: string;
  _id: string;
};

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
    updateCategory: builder.mutation({
      query: ({ categoryID, body}) => ({
        url: `/${categoryID}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Categories']
    }),
    deleteCategory: builder.mutation({
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
