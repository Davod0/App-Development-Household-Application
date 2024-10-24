import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export const getAllMembersByHouseholdId = createAsyncThunk(
  'members/getAllMembersByHouseholdId',
  async (householdId: string, { rejectWithValue }) => {
    try {
      const membersRef = collection(
        doc(db, 'households', householdId),
        'members',
      );
      const membersSnapshot = await getDocs(membersRef);
      const members = membersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return members;
    } catch (error) {
      //   return rejectWithValue(error.message);
    }
  },
);
