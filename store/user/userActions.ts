import { createAsyncThunk } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';
import { auth } from '../../firebase';
import { EmailPassword } from '../../types';
import { createAppAsyncThunk } from '../hooks';

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
      if (error instanceof FirebaseError) {
        let errorMessage = '';

        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'E-postadressen används redan av ett annat konto.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Ange en giltig e-postadress.';
            break;
          case 'auth/weak-password':
            errorMessage =
              'Lösenordet är för svagt. Vänligen använd ett starkare lösenord.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'Ingen användare hittades med denna e-postadress.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Fel lösenord angivet. Försök igen.';
            break;
          default:
            errorMessage = 'Ett okänt fel uppstod. Försök igen senare.' + error;
        }

        return thunkAPI.rejectWithValue(errorMessage);
      }
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
          case 'auth/invalid-credential':
            errorMessage = 'Din email eller lösenord är fel';
            break;
          default:
            errorMessage = 'Ett okänt fel uppstod. Försök igen senare.';
        }
        return thunkAPI.rejectWithValue(errorMessage);
      }
      console.error(error);
      return thunkAPI.rejectWithValue(
        'Something went wrong, Could not register the user!:',
      );
    }
  },
);

// getUserData (hushåll, profiler, sysslor, avklarade)
