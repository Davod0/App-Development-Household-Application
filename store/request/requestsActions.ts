import { collection, doc, setDoc } from 'firebase/firestore';
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
