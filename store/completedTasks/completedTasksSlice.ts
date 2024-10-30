import { createSlice } from '@reduxjs/toolkit';
import { CompletedTask } from '../../types';
import {
  addCompletedTask,
  getCompletedTasksByHousehold,
  getSelectedHouseholdTasks,
} from './completedTasksActions';

// state
type CompletedTasksState = {
  list: CompletedTask[];
  isLoading: boolean;
};
const initialState: CompletedTasksState = {
  list: [],
  isLoading: false,
};

// slice
const completedTasksSlice = createSlice({
  name: 'completedTasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCompletedTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCompletedTask.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.isLoading = false;
      })
      .addCase(getSelectedHouseholdTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSelectedHouseholdTasks.fulfilled, (_, action) => {
        return { list: action.payload, isLoading: false };
      })
      .addCase(getCompletedTasksByHousehold.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompletedTasksByHousehold.fulfilled, (_, action) => {
        return { list: action.payload, isLoading: false };
      });
  },
});

// export reducer and actions
export const completedTasksReducer = completedTasksSlice.reducer;
export const {} = completedTasksSlice.actions;
