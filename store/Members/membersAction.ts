import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { Member } from '../../data';
import { db } from '../../firebase';
import { CreateMembers } from './memberSlice';

export const getAllMembers = createAsyncThunk(
  'members/getAllMembers',
  async (_, { rejectWithValue }) => {
    try {
      // Get all households
      const householdsRef = collection(db, 'households');
      const householdsSnapshot = await getDocs(householdsRef);

      const allMembers: any[] = [];

      // Iterate through each household to get its members
      for (const householdDoc of householdsSnapshot.docs) {
        const householdId = householdDoc.id;

        // Query members for each household
        const membersRef = collection(db, 'households', householdId, 'members');
        const membersSnapshot = await getDocs(membersRef);

        membersSnapshot.forEach((doc) => {
          allMembers.push({
            id: doc.id,
            ...doc.data(),
            householdId, // Add householdId to track which household this member belongs to
          });
        });
      }

      return allMembers;
    } catch (error) {
      const errorMessage =
        (error as Error).message || 'Failed to fetch members';
      return rejectWithValue(errorMessage);
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

export const updateMember = createAsyncThunk<Member, Member>(
  'members/updateMember',
  async (updatedMember, { rejectWithValue }) => {
    try {
      const memberRef = doc(db, 'members', updatedMember.id);
      await updateDoc(memberRef, {
        name: updatedMember.name,
        householdId: updatedMember.householdId,
        avatarId: updatedMember.avatarId,
        isOwner: updatedMember.isOwner,
        isAllowed: updatedMember.isAllowed,
      });

      return updatedMember;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Unknown error');
    }
  },
);
