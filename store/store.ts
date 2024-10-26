import { configureStore } from '@reduxjs/toolkit';
import { completedTasksReducer } from './completedTasks/completedTasksSlice';
import { householdReducer } from './households/householdsSlice';
import { memberReducer } from './members/membersSlice';
import { scheduledTasksReducer } from './scheduledTasks/scheduledTasksSlice';
import { tasksReducer } from './tasks/tasksSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    members: memberReducer,
    households: householdReducer,
    tasks: tasksReducer,
    scheduledTasks: scheduledTasksReducer,
    completedTasks: completedTasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
