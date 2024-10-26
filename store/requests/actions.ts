import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { CreateRequest, Request } from '../../types';
import { createAppAsyncThunk } from '../hooks';

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

export const deleteRequest = createAppAsyncThunk<Request, Request>(
  'requests/delete',
  async (request, thunkApi) => {
    console.log(request);

    try {
      const docRef = doc(db, 'requests', request.id);
      await deleteDoc(docRef);
      return request;
    } catch (error) {
      return thunkApi.rejectWithValue(`Error deleting requests: ${error}`);
    }
  },
);
