import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { CreateMembers, Member } from '../../types';

export const getAllMembers = createAsyncThunk(
  'members/getAllMembers',
  async (_, { rejectWithValue }) => {
    try {
      // Get all households
      const householdsRef = collection(db, 'households');
      const householdsSnapshot = await getDocs(householdsRef);

      const memberPromises = householdsSnapshot.docs.map(
        async (householdDoc) => {
          const householdId = householdDoc.id;

          const membersRef = collection(
            db,
            'households',
            householdId,
            'members',
          );
          const membersSnapshot = await getDocs(membersRef);

          // Map each member to include all properties of the `Member` type
          return membersSnapshot.docs.map((memberDoc) => ({
            id: memberDoc.id,
            householdId,
            name: memberDoc.data().name || '',
            userId: memberDoc.data().userId || '',
            avatar: memberDoc.data().avatar || '',
            isOwner: memberDoc.data().isOwner || false,
            isAllowed: memberDoc.data().isAllowed || false,
          }));
        },
      );

      const membersArray = await Promise.all(memberPromises);
      const allMembers = membersArray.flat();

      return allMembers;
    } catch (error) {
      console.error('Error fetching members:', error);
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch members',
      );
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
        avatarId: updatedMember.avatar,
        isOwner: updatedMember.isOwner,
        isAllowed: updatedMember.isAllowed,
      });

      return updatedMember;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Unknown error');
    }
  },
);
