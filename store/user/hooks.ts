import { useFocusEffect } from '@react-navigation/native';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useCallback, useEffect } from 'react';
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
        await dispatch(getMembersByCurrentUserId()).unwrap();
        await dispatch(getHouseholdsByUserId()).unwrap();
      }
      console.log(`User from useUserAuthState: ${user?.email}`);
    });
    return unsubscribe;
  }, [dispatch]);

  // const members = useAppSelector(selectAllMembersBySelectedHousehold);
  // members.map((m) => console.log(`members1: ${m.name}`));
}

export async function useSelectedHouseholddata() {
  const dispatch = useAppDispatch();
  // const selectedHousehold = useAppSelector(selectSelectedHousehold);
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await dispatch(getMembersByHouseholdId());
        await dispatch(getSelectedHouseholdTasks());
        await dispatch(getCompletedTasksByHousehold());
      };
      fetchData();
    }, [dispatch]),
  );
}
