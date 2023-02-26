import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SCREEN_STATE } from "constants/screenState";

export const screenStatusSlice = createSlice({
  name: 'screenStatus',
  initialState: SCREEN_STATE.MAIN,
  reducers: {
    screen: (_, { payload }: PayloadAction<string>) => payload,
  },
});

export const { screen } = screenStatusSlice.actions;