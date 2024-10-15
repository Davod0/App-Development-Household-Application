import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { mockedUsers, User } from '../../data';
import { createUser } from './userActions';

const initialState: User[] = mockedUsers;

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    createUserOptimistically: (state, action: PayloadAction<User>) => {
      state.push(action.payload);
    },
    clearUserOptimistically: (state, action: PayloadAction<User>) => {
      state.filter((user) => user.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const { createUserOptimistically, clearUserOptimistically } =
  usersSlice.actions;
export default usersSlice.reducer;
