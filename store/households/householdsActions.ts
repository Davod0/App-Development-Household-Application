import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { CreateHousehold, Household } from '../../data';
import { db } from '../../firebase';
import { createAppAsyncThunk } from '../hooks';
import { addMember } from '../Members/membersAction';
import { CreateHouseholdMember } from '../Members/memberSlice';

export type CreateHouseholdWithMember = {
  household: CreateHousehold;
  member: CreateHouseholdMember;
};

interface UpdateHouseholdPayload {
  householdId: string;
  newName: string;
}

export const createHousehold = createAppAsyncThunk<
  Household,
  CreateHouseholdWithMember
>('Household/createHousehold', async ({ household, member }, thunkApi) => {
  const state = thunkApi.getState();

  if (!state.user.currentUser) {
    return thunkApi.rejectWithValue('No logged-in user');
  }

  try {
    const householdRef = collection(db, 'households');
    const newHouseholdRef = await addDoc(householdRef, household);
    const newHousehold: Household = {
      id: newHouseholdRef.id,
      ...household,
    };

    const newMember = {
      ...member,
      householdId: newHousehold.id,
    };

    const resultAction = await thunkApi.dispatch(addMember(newMember));
    unwrapResult(resultAction);

    console.log('householdId: ', household);

    // Return the created household object
    return newHousehold;
  } catch (error) {
    const errorMessage = (error as Error).message || 'Unknown error';
    return thunkApi.rejectWithValue(errorMessage);
  }
});

export const getHouseholds = createAsyncThunk<Household[]>(
  'households/getHouseholds',
  async (_, thunkApi) => {
    try {
      const householdsRef = await getDocs(collection(db, 'households'));
      const data: Household[] = [];
      householdsRef.forEach((doc) => data.push(doc.data() as Household));
      return data;
    } catch (error) {
      const errorMessage = (error as Error).message || 'Unknown error';
      return thunkApi.rejectWithValue(errorMessage);
    }
  },
);

export const updateHouseholdName = createAppAsyncThunk<
  void,
  UpdateHouseholdPayload
>(
  'households/updateHouseholdName',
  async ({ householdId, newName }, thunkApi) => {
    try {
      const householdRef = doc(db, 'households', householdId);

      await updateDoc(householdRef, { name: newName });

      return;
    } catch (error) {
      const errorMessage =
        (error as Error).message || 'Failed to update household name';
      return thunkApi.rejectWithValue(errorMessage);
    }
  },
);
