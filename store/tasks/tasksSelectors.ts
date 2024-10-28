import { RootState } from '../store';

// SELECTORS
export const selectTasks = (state: RootState) => state.tasks.list;

// export const selectTasksFromHouseholdId = (householdID: string) =>
//   createSelector([(state: RootState) => state.tasks.list], (tasks) =>
//     tasks.filter((task) => task.householdId === householdID),
//   );

// TODO: används inte just nu
export const selectTasksFromHouseholdId =
  (householdID: string) => (state: RootState) =>
    state.tasks.list.filter((tasks) => tasks.householdId === householdID);

export const selectTaskFromID = (taskID: string) => (state: RootState) =>
  state.tasks.list.find((task) => task.id === taskID);
