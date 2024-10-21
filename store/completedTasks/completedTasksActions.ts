import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { CompletedTask, CreateCompletedTask } from '../../data';
import { db } from '../../firebase';
import { createAppAsyncThunk } from '../hooks';

export const addCompletedTask = createAppAsyncThunk<
  CompletedTask,
  CreateCompletedTask
>('completedTasks/addCompletedTask', async (task, thunkApi) => {
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

export const getCompletedTasks = createAppAsyncThunk<CompletedTask[]>(
  'completedTasks/get',
  async (_, thunkAPI) => {
    try {
      const snapshot = await getDocs(collection(db, 'completedTasks'));
      const data: CompletedTask[] = [];
      snapshot.forEach((doc) => data.push(doc.data() as CompletedTask));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        `Error reading from database, completedTasks ${error}`,
      );
    }
  },
);
