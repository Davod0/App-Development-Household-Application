import { createAsyncThunk } from '@reduxjs/toolkit';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../firebase';
import { AppDispatch, RootState } from './store';
import { setUserOptimistically } from './user/userReducer';

export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppSelector = useSelector.withTypes<RootState>();

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejetValue: string;
}>();

export function useUserAuthState() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUserOptimistically(user?.toJSON() as User));
      console.log(`User from useUserAuthState: ${user?.email}`);
    });
    return unsubscribe;
  }, [dispatch]);
}
