import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, User } from 'firebase/auth';
import { EmailPassword } from '../../data';
import { auth } from '../../firebase';

export const signUpUser = createAsyncThunk<User, EmailPassword>(
  'users/signUp-user',
  async (emailPassword, thunkAPI) => {
    try {
      const result = await createUserWithEmailAndPassword(
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
