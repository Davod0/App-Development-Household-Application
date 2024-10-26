import { configureStore } from '@reduxjs/toolkit';
import { completedTasksReducer } from './completedTasks/completedTasksSlice';
import { householdReducer } from './households/householdsSlice';
import { memberReducer } from './members/membersSlice';
import { requestsReducer } from './requests/slice';
import { scheduledTasksReducer } from './scheduledTasks/scheduledTasksSlice';
import { tasksReducer } from './tasks/tasksSlice';
import userReducer from './user/userReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
    members: memberReducer,
    households: householdReducer,
    completedTasks: completedTasksReducer,
    scheduledTasks: scheduledTasksReducer,
    requests: requestsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
