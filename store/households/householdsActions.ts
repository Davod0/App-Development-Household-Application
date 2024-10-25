import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { CreateHousehold, CreateHouseholdMember, Household } from '../../types';
import { createAppAsyncThunk } from '../hooks';
import { addMember } from '../Members/membersAction';
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
    const householdRef = doc(collection(db, 'households'));
    const newHousehold: Household = {
      id: householdRef.id,
      ...household,
    };
    await setDoc(householdRef, newHousehold);

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

      householdsRef.forEach((doc) => {
        const householdData = doc.data() as Omit<Household, 'id'>; // Exclude 'id' from the type
        // Add the document ID to the household data
        data.push({ id: doc.id, ...householdData }); // This way, id won't overwrite
      });

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
