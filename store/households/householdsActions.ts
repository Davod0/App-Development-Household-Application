import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { CreateHouseholdWithMember, Household, Member } from '../../types';
import { createAppAsyncThunk } from '../hooks';

// addHousehold
// updateHousehold

export const addHousehold = createAppAsyncThunk<
  { household: Household; member: Member },
  CreateHouseholdWithMember
>('Household/createHousehold', async ({ household, member }, thunkApi) => {
  try {
    const householdRef = doc(collection(db, 'households'));
    const newHousehold: Household = {
      id: householdRef.id,
      ...household,
    };
    await setDoc(householdRef, newHousehold);

    // FIXME: same code as thunk members/add can we call that thunk from here?
    const memberRef = doc(collection(db, 'members'));
    const newMember: Member = {
      ...member,
      id: memberRef.id,
      householdId: newHousehold.id,
    };
    await setDoc(memberRef, newMember);

    return { household: newHousehold, member: newMember };
  } catch (error) {
    return thunkApi.rejectWithValue(
      `Error creating household or member: ${error}`,
    );
  }
});

export const getHouseholdsByUserId = createAppAsyncThunk<Household[]>(
  'Household/getByUserId',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const householdIds = state.user.memberProfiles
      .filter((m) => m.isAllowed)
      .map((member) => member.householdId);

    try {
      if (householdIds.length === 0) {
        throw new Error('Not in any households yet.');
      }
      const snapshot = await getDocs(
        query(collection(db, 'households'), where('id', 'in', householdIds)),
      );
      const data: Household[] = [];
      snapshot.forEach((doc) => data.push(doc.data() as Household));

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        `Error retrieving households for member: ${error}`,
      );
    }
  },
);

export const getHouseholdByCode = createAsyncThunk<Household, string>(
  'household/getByCode',
  async (householdCode, thunkApi) => {
    try {
      const q = query(
        collection(db, 'households'),
        where('code', '==', householdCode),
      );

      const querySnapshot = await getDocs(q);

      const doc = querySnapshot.docs[0];
      const householdData = { id: doc.id, ...doc.data() } as Household;
      console.log('Household data:', householdData);
      return householdData;
    } catch (error) {
      console.error('Error retrieving household:', error);
      return thunkApi.rejectWithValue(
        `Error retrieving household for code ${householdCode}: ${error}`,
      );
    }
  },
);

export const updateSelectedHouseholdName = createAppAsyncThunk<
  {
    housholdId: string;
    housholdName: string;
  },
  string
>('households/updateHouseholdName', async (newName, thunkApi) => {
  const state = thunkApi.getState();
  try {
    await updateDoc(doc(db, 'households', state.user.selectedHousehold!.id), {
      name: newName,
    });
    return {
      housholdId: state.user.selectedHousehold!.id,
      housholdName: newName,
    };
  } catch (error) {
    return thunkApi.rejectWithValue(`Error updating household: ${error}`);
  }
});

// export const getHouseholds = createAppAsyncThunk<Household[]>(
//   'households/getHouseholds',
//   async (_, thunkApi) => {
//     try {
//       const householdsRef = await getDocs(collection(db, 'households'));
//       const data: Household[] = [];

//       householdsRef.forEach((doc) => {
//         const householdData = doc.data() as Omit<Household, 'id'>; // Exclude 'id' from the type
//         // Add the document ID to the household data
//         data.push({ id: doc.id, ...householdData }); // This way, id won't overwrite
//       });

//       return data;
//     } catch (error) {
//       const errorMessage = (error as Error).message || 'Unknown error';
//       return thunkApi.rejectWithValue(errorMessage);
//     }
//   },
// );
