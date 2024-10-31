import { RootState } from '../store';

export const selectCompletedTasksBySelectedHousehold = (state: RootState) =>
  state.completedTasks.list;
