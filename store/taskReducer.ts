import { createSlice } from '@reduxjs/toolkit';
import { Task } from '../data';

// Flera (plural)
// Min: Alla tasks för det valda hushållet (filtering för användaren och hushåll i backenden)
// Max: Alla tasks för användaren alla hushåll (filtering för användaren i backenden, filtrering för hushåll med selector på klientsidan)
const initialState: Task = {
  id: '',
  householdId: '',
  name: '',
  description: '',
  weight: 0,
  frequency: 0,
  isArchived: false,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
});

export const {} = taskSlice.actions;
export default taskSlice.reducer;
