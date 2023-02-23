import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authApi } from './authApi';
import { authSlice } from './authSlice';

const persistConfig = {
  key: 'auth',
  version: 1,
  storage,
  whitelist: ['token'],
};

const reducers = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: persistReducer(persistConfig, authSlice.reducer),
})

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV === 'development',
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    authApi.middleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
