import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CompletedTask,
  CreateCompletedTask,
  mockedCompletedTasks,
} from '../../data';

// state
type CompletedTasksState = CompletedTask[];
const initialState: CompletedTasksState = mockedCompletedTasks;

// slice
const completedTasksSlice = createSlice({
  name: 'completedTasks',
  initialState,
  reducers: {
    addCompletedTask: (state, action: PayloadAction<CreateCompletedTask>) => {
      state.push({
        id: Date.now().toString(),
        ...action.payload,
      });
    },
  },
  // code for using thunks with firebase...
  // extraReducers: (builder) => {
  //   builder.addCase(addCompletedTask.fulfilled, (state, action) => {
  //     state.push(action.payload);
  //   });
  // },
});

// export reducer and actions
export const completedTasksReducer = completedTasksSlice.reducer;
export const { addCompletedTask } = completedTasksSlice.actions;
