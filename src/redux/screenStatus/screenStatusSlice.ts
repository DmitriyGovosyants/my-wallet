import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INFO_SCREEN } from "constants/infoState";

export const screenStatusSlice = createSlice({
  name: 'screenStatus',
  initialState: INFO_SCREEN.TRANSACTIONS,
  reducers: {
    currentScreen: (_, { payload }: PayloadAction<string>) => payload,
  },
});

export const { currentScreen } = screenStatusSlice.actions;