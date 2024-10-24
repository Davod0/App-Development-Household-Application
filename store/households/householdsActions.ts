import { createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { CreateHousehold, Household } from '../../data';
import { db } from '../../firebase';
import { createAppAsyncThunk } from '../hooks';
import { addMember, CreateHouseholdMember } from '../Members/memberSlice';

export type CreateHouseholdWithMember = {
  household: CreateHousehold;
  member: CreateHouseholdMember;
};

// export const addMember = createAsyncThunk<Member, CreateMembers>(
//   'members/addMember',
//   async (memberCreate, thunkApi) => {
//     try {
//       const memberRef = collection(
//         doc(db, 'households', memberCreate.householdId),
//         'members',
//       );
//       const newMemberRef = await addDoc(memberRef, memberCreate);

//       return {
//         id: newMemberRef.id,
//         ...memberCreate,
//       } as Member;
//     } catch (error) {
//       const errorMessage = (error as Error).message || 'Unknown error';
//       return thunkApi.rejectWithValue(errorMessage);
//     }
//   },
// );

// export const createHousehold = createAppAsyncThunk<
//   Household,
//   CreateHouseholdWithMember
// >('Household/createHousehold', async ({ household, member }, thunkApi) => {
//   const state = thunkApi.getState();

//   if (!state.user.currentUser) {
//     return thunkApi.rejectWithValue('No logged in user');
//   }
//   const id = Date.now().toString();
//   const newHousehold: Household = {
//     id,
//     ...household,
//   };
//   const newMember = {
//     ...member,
//     householdId: id,
//   };

//   // Dispatch the addMember action using thunkApi.dispatch
//   thunkApi.dispatch(addMember(newMember));

//   return newHousehold;
// });

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

    await thunkApi.dispatch(addMember(newMember));

    // Return the created household object
    return newHousehold;
  } catch (error) {
    const errorMessage = (error as Error).message || 'Unknown error';
    return thunkApi.rejectWithValue(errorMessage);
  }
});

export const getHouseholdsFromFirebase = createAsyncThunk<Household[]>(
  'households/fetchHouseholds',
  async (_, thunkApi) => {
    try {
      const householdsRef = collection(db, 'households');

      const querySnapshot = await getDocs(householdsRef);

      const households: Household[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Household[];

      return households;
    } catch (error) {
      const errorMessage = (error as Error).message || 'Unknown error';
      return thunkApi.rejectWithValue(errorMessage);
    }
  },
);
