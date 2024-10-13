import { configureStore } from '@reduxjs/toolkit';
import householdReducer from './householdReducer';
import taskReducer from './taskReducer';
import userReducer from './userReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
    household: householdReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
