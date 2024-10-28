import { RootState } from '../store';

export const selectCompletedTasksByHousehold = (state: RootState) =>
  state.completedTasks.list;
