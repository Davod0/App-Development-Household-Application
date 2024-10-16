import { configureStore } from '@reduxjs/toolkit';
import householdReducer from './householdReducer';
import taskReducer from './taskReducer';
import usersReducer from './user/usersReducer';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    task: taskReducer,
    household: householdReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
