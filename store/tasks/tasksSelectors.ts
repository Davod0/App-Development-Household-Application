import { RootState } from '../store';

// SELECTORS
export const selectTasksForSelectedHousehold = (state: RootState) =>
  state.tasks.list;

export const selectTaskFromTaskID = (taskID: string) => (state: RootState) =>
  state.tasks.list.find((task) => task.id === taskID);

export const selectActiveTasksForSelectedHousehold = (state: RootState) =>
  selectTasksForSelectedHousehold(state).filter((t) => !t.isArchived);

// export const selectTasksFromHouseholdId = (householdID: string) =>
//   createSelector([(state: RootState) => state.tasks.list], (tasks) =>
//     tasks.filter((task) => task.householdId === householdID),
//   );

// TODO: används inte just nu
export const selectTasksFromHouseholdId =
  (householdID: string) => (state: RootState) =>
    state.tasks.list.filter((tasks) => tasks.householdId === householdID);

export const selectTaskIsLoading = (state: RootState) => state.tasks.isLoading;
