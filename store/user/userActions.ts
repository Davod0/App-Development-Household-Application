import { FirebaseError } from 'firebase/app';
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
      if (error instanceof FirebaseError) {
        let errorMessage = '';

        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = 'Ingen användare hittades med denna e-postadress.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Fel lösenord angivet. Försök igen.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Ange en giltig e-postadress.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'Detta konto har inaktiverats. Kontakta support.';
            break;
          default:
            errorMessage = 'Ett okänt fel uppstod. Försök igen senare.';
        }
        return thunkAPI.rejectWithValue(errorMessage);
      }
      return thunkAPI.rejectWithValue(
        'Something went wrong, Could not register the user!:',
      );
    }
  },
);
