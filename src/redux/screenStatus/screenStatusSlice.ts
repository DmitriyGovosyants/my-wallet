import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SCREEN } from "constants/screenStatus";

export const screenStatusSlice = createSlice({
  name: 'screenStatus',
  initialState: SCREEN["TRANSACTION.TABLE"],
  reducers: {
    currentScreen: (_, { payload }: PayloadAction<string>) => payload,
  },
});

export const { currentScreen } = screenStatusSlice.actions;