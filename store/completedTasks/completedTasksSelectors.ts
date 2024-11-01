import { createSelector } from '@reduxjs/toolkit';
import {
  isDateInCurrentWeek,
  isDateInPreviousMonth,
  isDateInPreviousWeek,
} from '../../library/dateFunctions';
import { RootState } from '../store';

export const selectCompletedTasksBySelectedHousehold = (state: RootState) =>
  state.completedTasks.list;

// export const selectCompletedTasksForCurrentWeek = (state: RootState) =>
//   state.completedTasks.list.filter((task) =>
//     isDateInCurrentWeek(new Date(Date.parse(task.dateDone))),
//   );
// export const selectHasStatsCompletedTasksForCurrentWeek = (state: RootState) =>
//   selectCompletedTasksForCurrentWeek(state).length > 0;

export const selectCompletedTasksForCurrentWeek = createSelector(
  [selectCompletedTasksBySelectedHousehold],
  (list) =>
    list.filter((task) =>
      isDateInCurrentWeek(new Date(Date.parse(task.dateDone))),
    ),
);

export const selectHasStatsCompletedTasksForCurrentWeek = createSelector(
  [selectCompletedTasksForCurrentWeek],
  (list) => list.length > 0,
);

export const selectCompletedTasksForPreviousWeek = createSelector(
  [selectCompletedTasksBySelectedHousehold],
  (list) =>
    list.filter((task) =>
      isDateInPreviousWeek(new Date(Date.parse(task.dateDone))),
    ),
);

export const selectHasStatsCompletedTasksForPreviousWeek = createSelector(
  [selectCompletedTasksForPreviousWeek],
  (list) => list.length > 0,
);

export const selectCompletedTasksForPreviousMonth = createSelector(
  [selectCompletedTasksBySelectedHousehold],
  (list) =>
    list.filter((task) =>
      isDateInPreviousMonth(new Date(Date.parse(task.dateDone))),
    ),
);

export const selectHasStatsCompletedTasksForPreviousMonth = createSelector(
  [selectCompletedTasksForPreviousMonth],
  (list) => list.length > 0,
);
