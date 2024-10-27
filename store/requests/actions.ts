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
import { CreateRequest, Request } from '../../types';
import { createAppAsyncThunk } from '../hooks';
import { deleteMember } from '../members/membersActions';

export const addRequest = createAppAsyncThunk<Request, CreateRequest>(
  'requests/add',
  async (request, thunkApi) => {
    const newDocRef = doc(collection(db, 'requests'));
    const newRequest: Request = {
      ...request,
      id: newDocRef.id,
    };

    try {
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

// export const deleteRequest = createAppAsyncThunk<Request, Request>(
//   'requests/delete',
//   async (request, thunkApi) => {
//     try {
//       await deleteDoc(doc(db, 'requests', request.id));
//       return request;
//     } catch (error) {
//       return thunkApi.rejectWithValue(`Error deleting requests: ${error}`);
//     }
//   },
// );

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
