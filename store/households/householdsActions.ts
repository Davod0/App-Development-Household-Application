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
  Household,
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

    return newHousehold;
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
    const householdIds = state.user.memberProfiles.map(
      (member) => member.householdId,
    );

    try {
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
// export const getHouseholdsByCode = createAppAsyncThunk<Household>(
//   'Household/getByCode',
//   async (householdCode: string, thunkApi) => {
//     const state = thunkApi.getState();
//     const householdCode = state.households.list.map(
//       (household) => household.name,
//     );

//     try {
//       const snapshot = await getDocs(
//         query(collection(db, 'households'), where('name', '==', householdCode)),
//       );
//       const data: Household[] = [];
//       snapshot.forEach((doc) => data.push(doc.data() as Household));

//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(
//         `Error retrieving households for member: ${error}`,
//       );
//     }
//   },
// );

// export const getHouseholdByCode = createAppAsyncThunk<Household | null, string>(
//   'Household/getByCode',
//   async (householdCode: string, thunkApi) => {
//     try {
//       const snapshot = await getDocs(
//         query(collection(db, 'households'), where('name', '==', householdCode)),
//       );

//       // let data: Household | null = null;
//       // snapshot.forEach((doc) => {
//       //   data = doc.data() as Household;
//       // });

//       return snapshot;
//     } catch (error) {
//       return thunkApi.rejectWithValue(
//         `Error retrieving household for code ${householdCode}: ${error}`,
//       );
//     }
//   },
// );

export const getHouseholdByCode = createAsyncThunk<Household, string>(
  'household/getByCode',
  async (householdCode, thunkApi) => {
    try {
      const q = query(
        collection(db, 'households'),
        where('code', '==', householdCode),
      );

      const querySnapshot = await getDocs(q);

      // if (querySnapshot.empty) {
      //   console.log('No household found');
      //   return 'No household found';
      // }

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

export const updateHouseholdName = createAppAsyncThunk<Household, Household>(
  'households/updateHouseholdName',
  async (household, thunkApi) => {
    try {
      await updateDoc(doc(db, 'households', household.id), {
        name: household.name,
      });
      return household;
    } catch (error) {
      return thunkApi.rejectWithValue(`Error updating household: ${error}`);
    }
  },
);

// export const getHouseholds = createAsyncThunk<Household[]>(
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
