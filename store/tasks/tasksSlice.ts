import { createSlice } from '@reduxjs/toolkit';
import { mockedTasks, Task } from '../../data';
import { RootState } from '../store';
import { addTask } from './tasksAction';

// STATE
export type TaskState = {
  list: Task[];
};

const initialState: TaskState = {
  list: mockedTasks,
};

// SLICE
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });
  },
});

// REDUCER & ACTIONS
export const tasksReducer = tasksSlice.reducer;
export const {} = tasksSlice.actions;

// SELECTORS
export const selectTasks = (state: RootState) => state.tasks.list;
