import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, User } from 'firebase/auth';
import { auth } from '../../firebase';

export type EmailPassword = {
  email: string;
  password: string;
};

export const signUpUser = createAsyncThunk<User, EmailPassword>(
  'users/signUp-user',
  async (emailPassword, thunkAPI) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        emailPassword.email,
        emailPassword.password,
      );
      // return result.user;
      return result.user.toJSON() as User;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue('Could not register!');
    }
  },
);
