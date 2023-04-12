import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCurrentDate } from "utils";

type initialStateProps = {
  year: number;
  month: number;
}

const initialState = {
  year: Number(getCurrentDate().split("-")[0]),
  month: Number(getCurrentDate().split("-")[1]),
}

export const chosesDateSlice = createSlice({
  name: 'chosesDate',
  initialState,
  reducers: {
    choseDate: (_, { payload }: PayloadAction<initialStateProps>) => payload,
  },
});

export const { choseDate } = chosesDateSlice.actions;