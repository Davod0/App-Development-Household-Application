import { createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection } from 'firebase/firestore';
import { NewUser, User } from '../../data';
import { db } from '../../firebase';

export const createUser = createAsyncThunk<User, NewUser>(
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
