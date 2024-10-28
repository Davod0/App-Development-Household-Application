import {
  collection,
  doc,
  getDocs,
  or,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { Member, Request } from '../../types';
import { createAppAsyncThunk } from '../hooks';

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
    } catch (error: any) {
      return thunkApi.rejectWithValue({
        message: `retrieving requests for user: ${error.message || error}`,
      });
    }
  },
);
