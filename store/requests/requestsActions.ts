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
import { CreateMember, Household, Request } from '../../types';
import { createAppAsyncThunk } from '../hooks';
import { addMember, deleteMember } from '../members/membersActions';

export const addRequest = createAppAsyncThunk<Request, string>(
  'requests/add',
  async (code, thunkApi) => {
    const state = thunkApi.getState();
    try {
      // find a household with the code
      const snapshot = await getDocs(
        query(collection(db, 'households'), where('code', '==', code)),
      );
      if (snapshot.empty) {
        throw new Error('Koden finns inte, du angav: "' + code + '"');
      }
      let household: Household = snapshot.docs[0].data() as Household;
      // snapshot.forEach((doc) => {
      //   household = doc.data() as Household;
      // });

      // check if the user already have an active request for the household
      if (state.user.requestsByCurrentUser.length > 0) {
        const userMemberIds = state.user.requestsByCurrentUser.filter(
          (request) => request.householdId === household.id,
        );

        // const snapshot2 = await getDocs(
        //   query(
        //     collection(db, 'requests'),
        //     where('memberId', 'in', userMemberIds),
        //   ),
        // );
        // if (snapshot2.size > 0) {
        if (userMemberIds.length > 0) {
          throw new Error(
            'Du har redan en aktiv förfrågan till hushållet med kod: ' + code,
          );
        }
      }

      // check if there is room for another member in the household
      const memberSnapshot = await getDocs(
        query(
          collection(db, 'members'),
          where('householdId', '==', household.id),
        ),
      );
      if (memberSnapshot.size >= 8) {
        throw new Error(
          'Det finns inte plats för fler medlemmar i detta hushållet.',
        );
      }

      // create a member
      // const memberRef = doc(collection(db, 'members'));

      const newMember: CreateMember = {
        // id: memberRef.id,
        householdId: household!.id,
        name: state.user.currentUser!.email!,
        userId: state.user.currentUser!.uid,
        isOwner: false,
        isAllowed: false,
      };
      // await setDoc(memberRef, newMember);
      const member = await thunkApi.dispatch(addMember(newMember)).unwrap();

      // create the request
      const newDocRef = doc(collection(db, 'requests'));
      const newRequest: Request = {
        id: newDocRef.id,
        householdId: household!.id,
        memberId: member.id,
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
