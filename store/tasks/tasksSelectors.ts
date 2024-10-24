import { RootState } from '../store';

// SELECTORS
export const selectTasks = (state: RootState) => state.tasks.list;

export const selectTasksFromHouseholdId =
  (householdID: string) => (state: RootState) =>
    state.tasks.list.filter((tasks) => tasks.householdId === householdID);
