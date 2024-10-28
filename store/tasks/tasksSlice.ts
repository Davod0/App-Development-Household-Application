import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateTask, Task } from '../../types';
import {
  addTask,
  getTasksBySelectedHousehold,
  updateTask,
} from './tasksAction';

// STATE
// TODO: är ett objekt just nu ifall ni vill ha andra saker i den
export type TaskState = {
  list: Task[];
};

const initialState: TaskState = {
  list: [],
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
    builder.addCase(getTasksBySelectedHousehold.fulfilled, (state, action) => {
      return { ...state, list: action.payload };
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
