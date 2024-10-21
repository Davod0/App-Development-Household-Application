import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompletedTask, mockedCompletedTasks } from '../../data';
import { addCompletedTask } from './completedTasksActions';

// state
type CompletedTasksState = CompletedTask[];
const initialState: CompletedTasksState = mockedCompletedTasks;

// slice
const completedTasksSlice = createSlice({
  name: 'completedTasks',
  initialState,
  reducers: {
    //TODO: fix type
    addCompletedTask: (state, action: PayloadAction<CompletedTask>) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCompletedTask.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

// export reducer and actions
export const completedTasksReducer = completedTasksSlice.reducer;
export const {} = completedTasksSlice.actions;
