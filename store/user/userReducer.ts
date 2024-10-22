import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { signInUser, signUpUser } from './userActions';

type userState = {
  currentUser?: User;
  isLoading: boolean;
  registerErrorMessage?: string;
  loginErrorMessage?: string;
};
const initialState: userState = {
  currentUser: undefined,
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserOptimistically: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },

  extraReducers: async (builder) => {
    builder.addCase(signUpUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      // TODO: fix as string?!
      state.registerErrorMessage = action.payload as string;
      state.isLoading = false;
      console.log(`Error message from user reducer:1 ${action.payload}`);
    });
    builder.addCase(signInUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      // TODO: fix as string?!
      state.loginErrorMessage = action.payload as string;
      state.isLoading = false;
      console.log(`Error message from user reducer:2 ${action.payload}`);
    });
  },
});

export const { setUserOptimistically } = userSlice.actions;
export default userSlice.reducer;
