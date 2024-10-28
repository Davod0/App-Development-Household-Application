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
import { Household, Member, Request } from '../../types';
import { createAppAsyncThunk } from '../hooks';
import { deleteMember } from '../members/membersActions';

export const addRequest = createAppAsyncThunk<Request, string>(
  'requests/add',
  async (code, thunkApi) => {
    const state = thunkApi.getState();
    try {
      // find a household with the code
      const snapshot = await getDocs(
        query(collection(db, 'households'), where('code', '==', code)),
      );
      if (snapshot.size < 1) {
        throw new Error('Koden finns inte, du angav: "' + code + '"');
      }
      let household: Household;
      snapshot.forEach((doc) => {
        household = doc.data() as Household;
      });

      // check if the user already have an active request
      if (state.user.memberProfiles.length > 0) {
        const userMemberIds = state.user.memberProfiles.map(
          (member) => member.id,
        );
        const snapshot2 = await getDocs(
          query(
            collection(db, 'requests'),
            where('memberId', 'in', userMemberIds),
          ),
        );
        if (snapshot2.size > 0) {
          throw new Error(
            'Du har redan en aktiv förfrågan till hushållet med kod: ' + code,
          );
        }
      }

      // create a member
      const memberRef = doc(collection(db, 'members'));
      const newMember: Member = {
        id: memberRef.id,
        householdId: household!.id,
        name: state.user.currentUser!.email!,
        userId: state.user.currentUser!.uid,
        avatar: avatarList['fox'], //FIXME: find a avatar that's not taken
        isOwner: false,
        isAllowed: false,
      };
      await setDoc(memberRef, newMember);

      // create the request
      const newDocRef = doc(collection(db, 'requests'));
      const newRequest: Request = {
        id: newDocRef.id,
        householdId: household!.id,
        memberId: newMember.id,
      };

      await setDoc(newDocRef, newRequest);
      return newRequest;
    } catch (error) {
      return thunkApi.rejectWithValue(`Error creating new request: ${error}`);
    }
  },
);

export const getRequestsBySelectedHouseholdId = createAppAsyncThunk<Request[]>(
  'requests/getBySelectedHouseholdId',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    try {
      const snapshot = await getDocs(
        query(
          collection(db, 'requests'),
          where('householdId', '==', state.user.selectedHousehold?.id!),
        ),
      );
      const data: Request[] = [];
      snapshot.forEach((doc) => {
        data.push(doc.data() as Request);
      });
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(`Error retrieving requests: ${error}`);
    }
  },
);

export const acceptRequest = createAppAsyncThunk<Request, Request>(
  'requests/accept',
  async (request, thunkApi) => {
    try {
      const memberRef = doc(db, 'members', request.memberId);
      await updateDoc(memberRef, { isAllowed: true });
      await deleteDoc(doc(db, 'requests', request.id));
      return request;
    } catch (error) {
      return thunkApi.rejectWithValue(`Error accepting requests: ${error}`);
    }
  },
);

export const rejectRequest = createAppAsyncThunk<Request, Request>(
  'requests/reject',
  async (request, thunkApi) => {
    try {
      await thunkApi.dispatch(deleteMember(request.memberId));
      await deleteDoc(doc(db, 'requests', request.id));
      return request;
    } catch (error) {
      return thunkApi.rejectWithValue(`Error rejecting requests: ${error}`);
    }
  },
);

export const getRequestsByUserId = createAppAsyncThunk<Request[], string>(
  'Request/getByUserId',
  async (userId, thunkApi) => {
    try {
      // Get all members associated with the user
      const memberSnapshot = await getDocs(
        query(collection(db, 'members'), where('userId', '==', userId)),
      );

      const memberIds = memberSnapshot.docs.map((doc) => doc.id);

      // Get all requests where memberId is in the list of memberIds
      const requestSnapshot = await getDocs(
        query(collection(db, 'requests'), where('memberId', 'in', memberIds)),
      );

      const data: Request[] = [];
      requestSnapshot.forEach((doc) => data.push(doc.data() as Request));

      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue({
        message: `retrieving requests for user: ${error.message || error}`,
      });
    }
  },
);
