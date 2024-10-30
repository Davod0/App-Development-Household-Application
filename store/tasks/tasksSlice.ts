import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateTask, Task } from '../../types';
import {
  addTask,
  getTasksBySelectedHousehold,
  updateTask,
} from './tasksAction';

export type TaskState = {
  list: Task[];
  isLoading: boolean;
};

const initialState: TaskState = {
  list: [],
  isLoading: false,
};

// SLICE
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addNewTask: (state, action: PayloadAction<CreateTask>) => {
      state.list.push({
        id: Date.now().toString(),
        householdId: 'household-1',
        isArchived: false,
        ...action.payload,
      });
    },
  },
  // code for using thunks with firebase...
  extraReducers: (builder) => {
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });
    // builder.addCase(getTasks.fulfilled, (_, action) => {
    //   return { list: action.payload };
    // });
    builder.addCase(getTasksBySelectedHousehold.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTasksBySelectedHousehold.fulfilled, (_, action) => {
      return { list: action.payload, isLoading: false };
    });
    builder.addCase(getTasksBySelectedHousehold.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(
      updateTask.fulfilled,
      (state, action: PayloadAction<Task>) => {
        const index = state.list.findIndex(
          (task) => task.id === action.payload.id,
        );
        if (index !== -1) {
          state.list[index] = { ...state.list[index], ...action.payload };
        }
      },
    );
  },
});

// REDUCER & ACTIONS
export const tasksReducer = tasksSlice.reducer;
export const { addNewTask } = tasksSlice.actions;
