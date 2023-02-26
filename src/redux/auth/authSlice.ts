import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from './authApi';
import { RootState } from '../store';

type AuthState = {
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
};

type AuthResponse = {
  token: string;
};

const initialState: AuthState = {
  token: null,
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
        (state, { payload }: PayloadAction<AuthResponse>) => {
          state.token = payload.token;
          state.isLoggedIn = true;
        }
      )
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }: PayloadAction<AuthResponse>) => {
          state.token = payload.token;
          state.isLoggedIn = true;
        }
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, state => {
        state.token = null;
        state.isLoggedIn = false;
      })
      .addMatcher(authApi.endpoints.getCurrent.matchPending, state => {
        state.isRefreshing = true;
      })
      .addMatcher(authApi.endpoints.getCurrent.matchFulfilled, state => {
        state.isLoggedIn = true;
        state.isRefreshing = false;
      });
  },
});

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const getIsLoggedIn = (state: RootState)  => state.auth.isLoggedIn;
export const isRefreshing = (state: RootState)  => state.auth.isRefreshing;
