import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { CompletedTask, CreateCompletedTask } from '../../types';
import { createAppAsyncThunk } from '../hooks';

export const addCompletedTask = createAppAsyncThunk<
  CompletedTask,
  CreateCompletedTask
>('completedTasks/add', async (task, thunkApi) => {
  const newDocRef = doc(collection(db, 'completedTasks'));
  const data: CompletedTask = {
    id: newDocRef.id,
    ...task,
  };

  try {
    await setDoc(newDocRef, data);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(
      `Error writing to database, completedTasks ${error}`,
    );
  }
});

export const getCompletedTasksByHouseholdId = createAppAsyncThunk<
  CompletedTask[],
  string
>('completedTasks/getByHouseholdId', async (householdId, thunkAPI) => {
  try {
    const snapshot = await getDocs(
      query(
        collection(db, 'completedTasks'),
        where('householdId', '==', householdId),
      ),
    );
    const data: CompletedTask[] = [];
    snapshot.forEach((doc) => data.push(doc.data() as CompletedTask));
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      `Error reading from database, completedTasks ${error}`,
    );
  }
});

export const getCompletedTasksByHousehold = createAppAsyncThunk<
  CompletedTask[]
>('completedTasks/getByHousehold', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  try {
    const snapshot = await getDocs(
      query(
        collection(db, 'completedTasks'),
        where('householdId', '==', state.user.selectedHousehold?.id),
      ),
    );
    const data: CompletedTask[] = [];
    snapshot.forEach((doc) => data.push(doc.data() as CompletedTask));
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      `Error reading from database, completedTasks ${error}`,
    );
  }
});

// TODO: remove, I don't think this thunk is ever needed
// export const getAllCompletedTasks = createAppAsyncThunk<CompletedTask[]>(
//   'completedTasks/getAll',
//   async (_, thunkAPI) => {
//     try {
//       const snapshot = await getDocs(collection(db, 'completedTasks'));
//       const data: CompletedTask[] = [];
//       snapshot.forEach((doc) => data.push(doc.data() as CompletedTask));
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         `Error reading from database, completedTasks ${error}`,
//       );
//     }
//   },
// );
