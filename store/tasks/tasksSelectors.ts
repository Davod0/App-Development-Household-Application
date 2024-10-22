import { RootState } from '../store';

// SELECTORS
export const selectTasks = (state: RootState) => state.tasks.list;
