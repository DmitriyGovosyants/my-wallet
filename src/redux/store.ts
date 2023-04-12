import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
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
import { transactionTypeSlice } from './transactionType/transactionTypeSlice';
import { settingsApi } from './settingsApi/settingsApi';
import { categoriesApi } from './categoriesApi/categoriesApi';
import { transactionsApi } from './transactionsApi/transactionsApi';
import { chosesDateSlice } from './chosesDate/chosesDateSlice';

const persistConfig = {
  key: 'auth',
  version: 1,
  storage,
  whitelist: ['token'],
};

const appReducers = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [settingsApi.reducerPath]: settingsApi.reducer,
  [accountsApi.reducerPath]: accountsApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [transactionsApi.reducerPath]: transactionsApi.reducer,
  auth: persistReducer(persistConfig, authSlice.reducer),
  screenStatus: screenStatusSlice.reducer,
  transactionType: transactionTypeSlice.reducer,
  chosesDate: chosesDateSlice.reducer,
});

const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === 'USER_LOGOUT') {
    return appReducers(undefined, action)
  }

  return appReducers(state, action)
}

export const store = configureStore({
  reducer: rootReducer,
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
    transactionsApi.middleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
export const persistor = persistStore(store);
