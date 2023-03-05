import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
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
import { authApi } from './auth/authApi';
import { authSlice } from './auth/authSlice';
import { accountsApi } from './accounts/accountsApi';
import { screenStatusSlice } from './screenStatus/screenStatusSlice';
import { settingsApi } from './settingsApi/settingsApi';
import { categoriesApi } from './categoriesApi/categoriesApi';

const persistConfig = {
  key: 'auth',
  version: 1,
  storage,
  whitelist: ['token'],
};

const reducers = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [settingsApi.reducerPath]: settingsApi.reducer,
  [accountsApi.reducerPath]: accountsApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  auth: persistReducer(persistConfig, authSlice.reducer),
  screenStatus: screenStatusSlice.reducer,
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
    settingsApi.middleware,
    accountsApi.middleware,
    categoriesApi.middleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
export const persistor = persistStore(store);
