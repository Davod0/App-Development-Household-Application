import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '../../firebase';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getHouseholdsByUserId } from '../households/householdsActions';
import { getMembersByHouseholdId } from '../members/membersActions';
import { selectAllMembersBySelectedHousehold } from '../members/membersSelectors';
import { setUserOptimistically } from './userSlice';

export async function useUserAuthState() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      dispatch(setUserOptimistically(user?.toJSON() as User));
      if (user) {
        await dispatch(getMembersByHouseholdId());
        // await dispatch(getMembersByCurrentUserId());
        await dispatch(getHouseholdsByUserId());
      }
      console.log(`User from useUserAuthState: ${user?.email}`);
    });
    return unsubscribe;
  }, [dispatch]);

  const members = useAppSelector(selectAllMembersBySelectedHousehold);
  members.map((m) => console.log(`members: ${m.name}`));
}

{
  /*
  getUserData (hushåll, profiler, sysslor, avklarade)
  ladda tasks (om man valt ett speciellt hushåll, via YourHousholdsScreen)
*/
}
