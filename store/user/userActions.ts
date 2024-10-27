import { createAsyncThunk } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { EmailPassword, Member } from '../../types';
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

/**
 * hämtar flera "members" (medlemmar) från databasen, där varje "member" egentligen är samma person men är associerad med flera hushåll.
 *
 * @returns {Promise<Member[]>} En lista av "Member"-objekt associerade med nuvarande användare.
 */
export const getMembersByCurrentUserId = createAppAsyncThunk<Member[]>(
  'members/getByCurrenUserId',
  async (_, thunkApi) => {
    const state = thunkApi.getState();

    try {
      const snapshot = await getDocs(
        query(
          collection(db, 'members'),
          where('userId', '==', state.user.currentUser?.uid),
        ),
      );

      const data: Member[] = [];
      snapshot.forEach((doc) => data.push(doc.data() as Member));
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(`Error retrieving members: ${error}`);
    }
  },
);
