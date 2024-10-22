import { RootState } from '../store';

export const selectAllCompletedTasks = (state: RootState) =>
  state.completedTasks;
