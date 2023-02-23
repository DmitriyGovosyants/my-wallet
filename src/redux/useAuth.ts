import { useMemo } from 'react';
import { getIsLoggedIn } from "./authSlice";
import { useAppSelector } from './reduxHooks';

export const useAuth = () => {
  const isAuthorized = useAppSelector(getIsLoggedIn);

  return useMemo(() => ({ isAuthorized }), [isAuthorized]);
};