import { RootState } from '../store';

// Selector to get all scheduled tasks
export const selectAllScheduledTasks = (state: RootState) =>
  state.scheduledTasks;
