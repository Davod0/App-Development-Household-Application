import { createAsyncThunk } from '@reduxjs/toolkit';
import { Task, TaskCreate } from '../../data';

export const addTask = createAsyncThunk<Task, TaskCreate>(
  'tasks/addTask',
  async (taskData, thunkApi) => {
    return {
      id: Date.now().toString(),
      householdId: '1',
      isArchived: false,
      ...taskData,
    };
  },
);
