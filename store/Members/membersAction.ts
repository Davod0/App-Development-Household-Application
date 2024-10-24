import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from 'firebase/firestore';
import { Member } from '../../data';
import { db } from '../../firebase';
import { CreateMembers } from './memberSlice';

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
export const addMember = createAsyncThunk<Member, CreateMembers>(
  'members/addMember',
  async (memberCreate, thunkApi) => {
    try {
      const memberRef = collection(
        doc(db, 'households', memberCreate.householdId),
        'members',
      );
      const newMemberRef = await addDoc(memberRef, memberCreate);

      return {
        id: newMemberRef.id,
        ...memberCreate,
      } as Member;
    } catch (error) {
      const errorMessage = (error as Error).message || 'Unknown error';
      return thunkApi.rejectWithValue(errorMessage);
    }
  },
);

export const deleteMemberById = createAsyncThunk<string, string>(
  'members/deleteMemberById',
  async (memberId: string, { rejectWithValue }) => {
    try {
      const memberRef = doc(db, 'members', memberId);
      await deleteDoc(memberRef);
      return memberId;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Unknown error');
    }
  },
);
