import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '../../firebase';
import { getCompletedTasksByHousehold } from '../completedTasks/completedTasksActions';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getHouseholdsByUserId } from '../households/householdsActions';
import { selectAllHouseholdsByCurrentUser } from '../households/householdsSelectors';
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
      }
      console.log(`User from useUserAuthState: ${user?.email}`);
    });
    return unsubscribe;
  }, [dispatch]);

  // const members = useAppSelector(selectAllMembersBySelectedHousehold);
  // members.map((m) => console.log(`members1: ${m.name}`));
}

export async function useHouseholdsdata() {
  const dispatch = useAppDispatch();
  const userHouseholds = useAppSelector(selectAllHouseholdsByCurrentUser);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getMembersByHouseholdId());
      await dispatch(getSelectedHouseholdTasks());
      await dispatch(getCompletedTasksByHousehold());
    };
    fetchData();
  }, [dispatch, userHouseholds]);
  console.log(`__________________________`);
  console.log(`userHouseholds: ${userHouseholds}`);
  userHouseholds.map((h) => console.log(`household: ${h.name}`));
  console.log(`__________________________`);
}
