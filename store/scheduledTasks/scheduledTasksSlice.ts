import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockedScheduledTasks } from '../../data';
import { CreateScheduledTask, ScheduledTask } from '../../types';
import {
  addScheduledTaskAsync,
  deleteScheduledTaskAsync,
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
        id: Date.now().toString(),
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

    builder.addCase(updateScheduledTaskAsync.fulfilled, (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    });
    builder.addCase(deleteScheduledTaskAsync.fulfilled, (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    });
  },
});

export const scheduledTasksReducer = scheduledTasksSlice.reducer;
export const { addScheduledTask } = scheduledTasksSlice.actions;
