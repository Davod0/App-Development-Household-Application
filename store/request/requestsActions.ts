import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { CreateRequestWithMember, Member, Request } from '../../types';
import { createAppAsyncThunk } from '../hooks';

export const registerGoToHouseholdRequest = createAppAsyncThunk<
  Request,
  CreateRequestWithMember
>('Request/createRequest', async ({ request, member }, thunkApi) => {
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
  'Request/getByHouseholdId',
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

export const getRequestsByUserId = createAppAsyncThunk<Request[], string>(
  'Request/getByUserId',
  async (userId, thunkApi) => {
    try {
      // Get all members associated with the user
      const memberSnapshot = await getDocs(
        query(collection(db, 'member'), where('userId', '==', userId)),
      );

      const memberIds = memberSnapshot.docs.map((doc) => doc.id);

      // Get all requests where memberId is in the list of memberIds
      const requestSnapshot = await getDocs(
        query(collection(db, 'requests'), where('memberId', 'in', memberIds)),
      );

      const data: Request[] = [];
      requestSnapshot.forEach((doc) => data.push(doc.data() as Request));

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        `Error retrieving requests for user: ${error}`,
      );
    }
  },
);
