import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { ColorMode } from '../../theme/ThemeProvider';
import { Household, Member } from '../../types';
import {
  getMembersByCurrentUserId,
  signInUser,
  signUpUser,
} from './userActions';

type userState = {
  currentUser?: User;
  isLoading: boolean;
  signUpErrorMessage?: string;
  signInErrorMessage?: string;
  theme: ColorMode;
  memberProfiles: Member[];
  selectedHousehold?: Household;
};
const initialState: userState = {
  currentUser: undefined,
  isLoading: true,
  theme: 'auto',
  memberProfiles: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserOptimistically: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    setColorMode: (state, action: PayloadAction<ColorMode>) => {
      state.theme = action.payload;
    },
    setSelectedHousehold: (state, action: PayloadAction<Household>) => {
      state.selectedHousehold = action.payload;
    },
  },

  extraReducers: async (builder) => {
    builder
      .addCase(signUpUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.signUpErrorMessage = action.payload;
        state.isLoading = false;
        console.log(`Error message from user reducer: ${action.payload}`);
      })
      .addCase(signInUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.signInErrorMessage = action.payload;
        state.isLoading = false;
        console.log(`Error message from user reducer:2 ${action.payload}`);
      })
      .addCase(getMembersByCurrentUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMembersByCurrentUserId.fulfilled, (state, action) => {
        return {
          ...state,
          memberProfiles: action.payload,
          isLoading: false,
        };
      });
  },
});

export const { setUserOptimistically, setColorMode, setSelectedHousehold } =
  userSlice.actions;
export default userSlice.reducer;
