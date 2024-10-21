import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';
import { EmailPassword } from '../../data';
import { auth } from '../../firebase';
import { createAppAsyncThunk } from '../hooks';

export const signUpUser = createAppAsyncThunk<void, EmailPassword>(
  'users/signUp-user',
  async (emailPassword, thunkAPI) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        emailPassword.email,
        emailPassword.password,
      );
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(
        'Something went wrong, Could not register the user!:',
      );
    }
  },
);

export const signInUser = createAppAsyncThunk<User, EmailPassword>(
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
