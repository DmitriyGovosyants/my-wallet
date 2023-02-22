import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from './authApi';
import { RootState } from './store';

interface IAuthState {
  token: string | null;
  email: string | null;
  name: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
};

interface IAuthResponse {
  data: {
    token: string;
    email: string;
    name: string;
  }
};

const initialState: IAuthState = {
  token: null,
  email: null,
  name: null,
  isLoggedIn: false,
  isRefreshing: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }: PayloadAction<IAuthResponse>): void => {
          state.token = payload.data.token;
          state.email = payload.data.email;
          state.name = payload.data.name;
          state.isLoggedIn = true;
        }
      )
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }: PayloadAction<IAuthResponse>) => {
          state.token = payload.data.token;
          state.email = payload.data.email;
          state.name = payload.data.name;
          state.isLoggedIn = true;
        }
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, state => {
        state.token = null;
        state.email = null;
        state.name = null;
        state.isLoggedIn = false;
      })
      .addMatcher(authApi.endpoints.getCurrent.matchPending, state => {
        state.isRefreshing = true;
      })
      .addMatcher(authApi.endpoints.getCurrent.matchFulfilled,
        (state, { payload }: PayloadAction<IAuthResponse>) => {
          state.email = payload.data.email;
          state.name = payload.data.name;
          state.isLoggedIn = true;
          state.isRefreshing = false;
      });
  },
});

export const selectCurrentUser = (state: RootState) => state.auth.token;
export const selectCurrentEmail = (state: RootState)  => state.auth.email;
export const selectCurrentName = (state: RootState)  => state.auth.name;
export const getIsLoggedIn = (state: RootState)  => state.auth.isLoggedIn;
export const isRefreshing = (state: RootState)  => state.auth.isRefreshing;
