import { createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection } from 'firebase/firestore';
import { User } from '../../data';
import { db } from '../../firebase';

export type UIUser = Omit<User, 'id'>;

export const createUser = createAsyncThunk<User, UIUser>(
  'users/add-user',
  async (user, thunkAPI) => {
    const docRef = await addDoc(collection(db, 'users'), {
      firstName: user.firstName,
      lastName: user.lastName,
    });
    const storedUser: User = {
      id: docRef.id,
      ...user,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    //return data to redux store
    return storedUser;
  },
);
