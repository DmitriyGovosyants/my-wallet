import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from "./authSlice";

export const useAuth = () => {
  const isAuthorized = useSelector(getIsLoggedIn);

  return useMemo(() => ({ isAuthorized }), [isAuthorized]);
};