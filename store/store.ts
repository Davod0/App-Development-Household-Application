import { configureStore } from '@reduxjs/toolkit';
import householdReducer from './householdReducer';
import taskReducer from './taskReducer';
import userReducer from './user/userReducer';

export const store = configureStore({
  reducer: {
    user: userReducer, // singular?
    task: taskReducer, // plural?
    household: householdReducer, // plural?
    // members // selector för att filtrera på exempelvis det valda hushållet
    // completedTasks
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
