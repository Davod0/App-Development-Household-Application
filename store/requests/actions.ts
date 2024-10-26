import { collection, doc, setDoc } from 'firebase/firestore';
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

//deleteRequest
//getRequestsByHouseholdId
