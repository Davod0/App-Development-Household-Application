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
import { avatarList } from '../../library/avatarList';
import { getAvailableIcons, randomIndex } from '../../library/utils';
import { CreateMember, Member } from '../../types';
import { createAppAsyncThunk } from '../hooks';

export const addMember = createAppAsyncThunk<Member, CreateMember>(
  'members/add',
  async (member, thunkApi) => {
    const randomAvailableAvatar = await getAvailableIcons(member.householdId);
    const randomAvatar =
      randomAvailableAvatar[randomIndex(randomAvailableAvatar)];

    const memberRef = doc(collection(db, 'members'));
    const newMember: Member = {
      id: memberRef.id,
      avatar: avatarList[randomAvatar],
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
