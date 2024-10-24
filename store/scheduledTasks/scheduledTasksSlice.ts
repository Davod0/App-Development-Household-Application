import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockedScheduledTasks } from '../../data';
import { CreateScheduledTask, ScheduledTask } from '../../types';

// State type
type ScheduledTasksState = ScheduledTask[];

// Initial state
const initialState: ScheduledTasksState = mockedScheduledTasks;

// Slice
const scheduledTasksSlice = createSlice({
  name: 'scheduledTasks',
  initialState,
  reducers: {
    addScheduledTask: (state, action: PayloadAction<CreateScheduledTask>) => {
      state.push({
        id: Date.now().toString(), // Generate a unique ID for the task
        ...action.payload,
      });
    },
    // Optional: You could add more reducers like removeScheduledTask, updateScheduledTask, etc.
  },
});

// Export the reducer and actions
export const scheduledTasksReducer = scheduledTasksSlice.reducer;
export const { addScheduledTask } = scheduledTasksSlice.actions;
