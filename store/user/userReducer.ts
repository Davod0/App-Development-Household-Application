import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { signInUser, signUpUser } from './userActions';

type userState = {
  currentUser?: User;
  isLoading: boolean;
  error?: string;
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
    clearUserOptimistically: (state, action: PayloadAction<User>) => {},
  },
  extraReducers: async (builder) => {
    builder.addCase(signUpUser.fulfilled, (state, action) => {});

    builder.addCase(signInUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.log(`Error message from user reducer: ${action.payload}`);
    });
  },
});

export const { setUserOptimistically, clearUserOptimistically } =
  userSlice.actions;
export default userSlice.reducer;
