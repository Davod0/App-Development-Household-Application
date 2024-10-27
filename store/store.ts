import { configureStore } from '@reduxjs/toolkit';
import { completedTasksReducer } from './completedTasks/completedTasksSlice';
import { householdReducer } from './households/householdsSlice';
import { memberReducer } from './members/membersSlice';
import { requestReducer } from './request/requestsSlice';
import { scheduledTasksReducer } from './scheduledTasks/scheduledTasksSlice';
import { tasksReducer } from './tasks/tasksSlice';
import userReducer from './user/userReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
    // household: householdReducer, // plural?
    households: householdReducer, // plural?
    completedTasks: completedTasksReducer,
    scheduledTasks: scheduledTasksReducer,
    members: memberReducer,
    requests: requestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
