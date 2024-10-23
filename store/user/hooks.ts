import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '../../firebase';
import { useAppDispatch } from '../hooks';
import { setUserOptimistically } from './userReducer';

export function useUserAuthState() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUserOptimistically(user?.toJSON() as User));
      //if(user){dispatch user data}
      console.log(`User from useUserAuthState: ${user?.email}`);
    });
    return unsubscribe;
  }, [dispatch]);
}
