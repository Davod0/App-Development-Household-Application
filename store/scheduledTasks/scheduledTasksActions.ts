import { createAsyncThunk } from '@reduxjs/toolkit';
import { ScheduledTask } from '../../data';

// Thunk to fetch scheduled tasks from an API or database
export const fetchScheduledTasks = createAsyncThunk<ScheduledTask[]>(
  'scheduledTasks/fetchAll',
  async () => {
    const response = await fetch('https://api.example.com/scheduled-tasks');
    return (await response.json()) as ScheduledTask[];
  },
);
