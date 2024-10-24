import { createAsyncThunk } from '@reduxjs/toolkit';
import { ScheduledTask, CreateScheduledTask } from '../../data';

// Thunk to fetch scheduled tasks from an API or database
export const fetchScheduledTasks = createAsyncThunk<ScheduledTask[]>(
  'scheduledTasks/fetchAll',
  async () => {
    const response = await fetch('https://api.example.com/scheduled-tasks');
    return (await response.json()) as ScheduledTask[];
  },
);

// Thunk to add a new scheduled task to the API or database
export const addScheduledTaskAsync = createAsyncThunk(
  'scheduledTasks/add',
  async (newTask: CreateScheduledTask) => {
    const response = await fetch('https://api.example.com/scheduled-tasks', {
      method: 'POST',
      body: JSON.stringify(newTask),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return (await response.json()) as CreateScheduledTask;
  },
);
