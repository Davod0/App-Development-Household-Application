import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ScheduledTask,
  CreateScheduledTask,
  mockedScheduledTasks,
} from '../../data';
import {
  addScheduledTaskAsync,
  fetchScheduledTasks,
  updateScheduledTaskAsync,
} from './scheduledTasksActions';

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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchScheduledTasks.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(addScheduledTaskAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });

    // builder.addCase(updateScheduledTaskAsync.fulfilled, (state, action) => {
    //   if (index !== -1) {
    //     state[index] = action.payload;
    //   }
    // });
  },
});

// Export the reducer and actions
export const scheduledTasksReducer = scheduledTasksSlice.reducer;
export const { addScheduledTask } = scheduledTasksSlice.actions;
