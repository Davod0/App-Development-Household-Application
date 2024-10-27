import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';
import {
  CreateRequestWithMember,
  Household,
  Member,
  Request,
} from '../../types';
import { createAppAsyncThunk } from '../hooks';

export const registerGoToHouseholdRequest = createAppAsyncThunk<
  Request,
  CreateRequestWithMember
>('requests/create', async ({ request, member }, thunkApi) => {
  try {
    const memberRef = doc(collection(db, 'members'));
    const newMember: Member = {
      id: memberRef.id,
      ...member,
    };
    await setDoc(memberRef, newMember);

    const requestRef = doc(collection(db, 'requests'));
    const newRequest: Request = {
      id: requestRef.id,
      ...request,
      memberId: memberRef.id,
    };
    await setDoc(requestRef, newRequest);

    return newRequest;
  } catch (error) {
    return thunkApi.rejectWithValue(
      `Error creating household or member: ${error}`,
    );
  }
});

export const getRequestsByHouseholdId = createAppAsyncThunk<Request[], string>(
  'requests/getByHouseholdId',
  async (householdId, thunkApi) => {
    try {
      const snapshot = await getDocs(
        query(
          collection(db, 'requests'),
          where('householdId', '==', householdId),
        ),
      );
      const data: Request[] = [];
      snapshot.forEach((doc) => data.push(doc.data() as Request));

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        `Error retrieving requests for household: ${error}`,
      );
    }
  },
);

// export const getHouseholds = createAsyncThunk<Household[]>(
//   'households/getHouseholds',
//   async (_, thunkApi) => {
//     try {
//       const householdsRef = await getDocs(collection(db, 'households'));
//       const data: Household[] = [];
//       householdsRef.forEach((doc) =>
//         data.push({ ...doc.data(), id: doc.id } as Household),
//       );
//       console.log('Fetched households data:', data); // Log fetched data for debugging
//       return data;
//     } catch (error) {
//       const errorMessage = (error as Error).message || 'Unknown error';
//       return thunkApi.rejectWithValue(errorMessage);
//     }
//   },
// );