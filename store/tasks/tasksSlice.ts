import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockedTasks } from '../../data';
import { CreateTask, Task } from '../../types';

// STATE
// TODO: är ett objekt just nu ifall ni vill ha andra saker i den
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
  reducers: {
    addNewTask: (state, action: PayloadAction<CreateTask>) => {
      state.list.push({
        id: Date.now().toString(),
        ...action.payload,
      });
    },
  },
  // code for using thunks with firebase...
  // extraReducers: (builder) => {
  //   builder.addCase(addTask.fulfilled, (state, action) => {
  //     state.list.push(action.payload);
  //   });
  // },
});

// REDUCER & ACTIONS
export const tasksReducer = tasksSlice.reducer;
export const { addNewTask } = tasksSlice.actions;
