import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { CreateMember, Member } from '../../types';
import { createAppAsyncThunk } from '../hooks';

export const addMember = createAppAsyncThunk<Member, CreateMember>(
  'members/add',
  async (member, thunkApi) => {
    const memberRef = doc(collection(db, 'members'));
    const newMember: Member = {
      id: memberRef.id,
      ...member,
    };

    try {
      await setDoc(memberRef, newMember);
      return newMember;
    } catch (error) {
      return thunkApi.rejectWithValue(`Error creating member: ${error}`);
    }
  },
);

export const updateMember = createAppAsyncThunk<Member, Member>(
  'members/update',
  async (member, thunkApi) => {
    try {
      await updateDoc(doc(db, 'members', member.id), {
        name: member.name,
        householdId: member.householdId,
        avatar: member.avatar,
        isOwner: member.isOwner,
        isAllowed: member.isAllowed,
      });
      return member;
    } catch (error) {
      return thunkApi.rejectWithValue(`Error updating member: ${error}`);
    }
  },
);

export const getMembersBySelectedHousehold = createAppAsyncThunk<Member[]>(
  'members/getBySelectedHousehold',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    try {
      const snapshot = await getDocs(
        query(
          collection(db, 'members'),
          where('householdId', '==', state.user.selectedHousehold?.id),
        ),
      );

      const data: Member[] = [];
      snapshot.forEach((doc) => data.push(doc.data() as Member));
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(`Error retrieving members: ${error}`);
    }
  },
);

/* 
  lämna ett hushåll är VG-kvar
  kommer ge lite komplikationer, vad ska vi göra med completedTasks och scheduledTasks som är 
  kopplade till denna medlem som kommer raderas? vi kommer förmodligen behöva göra en "cascading delete". 

  kanske behöver denna ändå ifall man vill neka en request så kommer man ha en användare som 
  inte är kopplad till något hushåll, den ska vara ofarlig att radera.
*/
export const deleteMember = createAppAsyncThunk<string, string>(
  'members/delete',
  async (memberId, thunkApi) => {
    try {
      await deleteDoc(doc(db, 'members', memberId));
      return memberId;
    } catch (error) {
      return thunkApi.rejectWithValue(`Error deleting member: ${error}`);
    }
  },
);
