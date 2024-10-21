import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { signUpUser } from './userActions';

type userState = {
  currentUser?: User;
  isLoading: boolean;
  errorMessage?: string;
};
const initialState: userState = {
  currentUser: undefined,
  isLoading: true,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserOptimistically: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    clearUserOptimistically: (state, action: PayloadAction<User>) => {
      state.currentUser = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.fulfilled, (state, action) => {});
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.errorMessage = action.payload as any;
    });
  },
});

export const { setUserOptimistically, clearUserOptimistically } =
  userSlice.actions;
export default userSlice.reducer;
