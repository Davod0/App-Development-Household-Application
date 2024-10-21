import { RootState } from '../store';

// selectors

export const selectAllCompletedTasks = (state: RootState) =>
  state.completedTasks;
