import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';
import { EmailPassword } from '../../data';
import { auth } from '../../firebase';

export const signUpUser = createAsyncThunk<void, EmailPassword>(
  'users/signUp-user',
  async (emailPassword, thunkAPI) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        emailPassword.email,
        emailPassword.password,
      );
      // return result.user.toJSON() as User;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(
        'Something went wrong, Could not register the user!:',
      );
    }
  },
);

export const signInUser = createAsyncThunk<User, EmailPassword>(
  'users/signIn-user',
  async (emailPassword, thunkAPI) => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        emailPassword.email,
        emailPassword.password,
      );
      return result.user.toJSON() as User;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(
        'Something went wrong, Could not register the user!:',
      );
    }
  },
);
