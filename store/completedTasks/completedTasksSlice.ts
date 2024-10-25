import { createSlice } from '@reduxjs/toolkit';
import { CompletedTask } from '../../types';
import {
  addCompletedTask,
  getCompletedTasksByHouseholdId,
} from './completedTasksActions';

// state
type CompletedTasksState = CompletedTask[];
const initialState: CompletedTasksState = [];

// slice
const completedTasksSlice = createSlice({
  name: 'completedTasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCompletedTask.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(getCompletedTasksByHouseholdId.fulfilled, (_, action) => {
        // by using return the state is replaced
        return action.payload;
      });
  },
});

// export reducer and actions
export const completedTasksReducer = completedTasksSlice.reducer;
export const {} = completedTasksSlice.actions;
