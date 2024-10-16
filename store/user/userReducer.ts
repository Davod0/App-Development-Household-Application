import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { signUpUser } from './userActions';

type userState = {
  currentUser?: User;
};
const initialState: userState = {
  currentUser: undefined,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    createUserOptimistically: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    clearUserOptimistically: (state, action: PayloadAction<User>) => {
      state.currentUser = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },
});

export const { createUserOptimistically, clearUserOptimistically } =
  userSlice.actions;
export default userSlice.reducer;
