import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { transactionTypes } from "redux/transactionsApi/transactionsApi";

export const transactionTypeSlice = createSlice({
  name: 'transactionType',
  initialState: transactionTypes.Revenue,
  reducers: {
    transactionType: (_, { payload }: PayloadAction<transactionTypes>) => payload,
  },
});

export const { transactionType } = transactionTypeSlice.actions;