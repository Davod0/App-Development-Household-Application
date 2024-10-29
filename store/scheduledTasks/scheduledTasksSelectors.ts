import { RootState } from '../store';

export const selectAllScheduledTasks = (state: RootState) =>
  state.scheduledTasks;
