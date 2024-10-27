import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '../../firebase';
import { getCompletedTasksByHousehold } from '../completedTasks/completedTasksActions';
import { useAppDispatch } from '../hooks';
import { getHouseholdsByUserId } from '../households/householdsActions';
import { getMembersByHouseholdId } from '../members/membersActions';
import { getSelectedHouseholdTasks } from '../tasks/tasksAction';
import { getMembersByCurrentUserId } from './userActions';
import { setUserOptimistically } from './userSlice';

export async function useUserAuthState() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      dispatch(setUserOptimistically(user?.toJSON() as User));
      if (user) {
        await dispatch(getMembersByCurrentUserId());
        await dispatch(getHouseholdsByUserId());
        await dispatch(getMembersByHouseholdId()); // Behövs denna metod anropas?
        await dispatch(getSelectedHouseholdTasks());
        await dispatch(getCompletedTasksByHousehold());
      }
      console.log(`User from useUserAuthState: ${user?.email}`);
    });
    return unsubscribe;
  }, [dispatch]);

  // const members = useAppSelector(selectAllMembersBySelectedHousehold);
  // members.map((m) => console.log(`members: ${m.name}`));
}

{
  /*
  kolla när setSelectedHousehold som ligger i user statet sätts ???
  eftersom selectedHousehold i user statet används nu i flera ställe
  som: (getMembersByHouseholdId, getSelectedHouseholdTasks, getCompletedTasksByHousehold)
  för att hämta data från firebase.
*/
}
