import { RootState } from '../store';

// SELECTORS
export const selectTasksForCurrentHousehold = (state: RootState) =>
  state.tasks.list;
