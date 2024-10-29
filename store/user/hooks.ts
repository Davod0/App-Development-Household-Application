import { useFocusEffect } from '@react-navigation/native';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useCallback, useEffect } from 'react';
import { auth } from '../../firebase';
import { getCompletedTasksByHousehold } from '../completedTasks/completedTasksActions';
import { useAppDispatch } from '../hooks';
import { getHouseholdsByUserId } from '../households/householdsActions';
import { getMembersBySelectedHousehold } from '../members/membersActions';
import { getRequestsBySelectedHouseholdId } from '../requests/requestsActions';
import { getTasksBySelectedHousehold } from '../tasks/tasksAction';
import { getMembersByCurrentUserId } from './userActions';
import { setUserOptimistically } from './userSlice';

export async function useUserAuthState() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      dispatch(setUserOptimistically(user?.toJSON() as User));
      if (user) {
        const members = await dispatch(getMembersByCurrentUserId()).unwrap();
        // added this check to prevent trying to get housholds when there won't be any
        if (members.length > 0) {
          await dispatch(getHouseholdsByUserId()).unwrap();
        }
      }
      console.log(`User from useUserAuthState: ${user?.email}`);
    });
    return unsubscribe;
  }, [dispatch]);

  {
    /*
    TEST
    const members = useAppSelector(selectCurrentUserMemberProfiles);
    members.map((m) =>
      console.log(`M name from hook: ${m.name}| M H ID: ${m.householdId}`),
    );
    console.log(`_________________________________________________`);
    const households = useAppSelector(selectAllHouseholdsByCurrentUser);
    households.map((h) =>
      console.log(`H name from hook: ${h.name}| H ID: ${h.id} `),
    );
  */
  }
}

export async function useSelectedHouseholdData() {
  const dispatch = useAppDispatch();
  // const selectedHousehold = useAppSelector(selectSelectedHousehold);
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await dispatch(getMembersBySelectedHousehold());
        await dispatch(getTasksBySelectedHousehold());
        await dispatch(getCompletedTasksByHousehold());
        await dispatch(getRequestsBySelectedHouseholdId());
        getRequestsBySelectedHouseholdId;
      };
      fetchData();
    }, [dispatch]),
  );

  {
    /*
      TEST
  console.log(`_________________________________________________`);
  const members = useAppSelector(selectAllMembersBySelectedHousehold);
  members.map((m) =>
    console.log(`M name from hook: ${m.name}| M H ID: ${m.householdId}`),
  );
  const tasks = useAppSelector(selectTasksForCurrentHousehold);
  tasks.map((t) => console.log(`task name from hook: ${t.name}`));
  const completedTasks = useAppSelector(selectCompletedTasksByHousehold);
  completedTasks.map((ct) =>
    console.log(`completedTasks ID from hook: ${ct.id}`),
  );
  const requestsForSelectedHousehold = useAppSelector(
    selectAllRequestsOfSelectedHousehold,
  );
  requestsForSelectedHousehold.map((r) =>
    console.log(`requests ID from hook: ${r.id}`),
  );
  console.log(`_________________________________________________`);
  */
  }
}
