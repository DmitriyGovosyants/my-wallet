import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { selectCurrentToken, getIsLoggedIn } from 'redux/auth/authSlice';
import { useGetCurrentQuery } from 'redux/auth/authApi';
import { useAppSelector } from '../reduxHooks';

export const GetCurrentUser = async () => {
  const token = useAppSelector(selectCurrentToken);
  const isAuthorized = useAppSelector(getIsLoggedIn);
  const data = useGetCurrentQuery('', {
    skip: token === null || isAuthorized === true,
  });

  try {
    unwrapResult(data);
  } catch (error) {
    if (error.status === 498) {
      window.localStorage.setItem('persist:auth', null);
      window.location.reload();
    }
    if (error.originalStatus === 404) {
      toast.error('Resourses not found');
    }
  }
};