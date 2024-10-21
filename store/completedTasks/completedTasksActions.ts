import { collection, doc } from 'firebase/firestore';
import { CompletedTask, CreateCompletedTask } from '../../data';
import { db } from '../../firebase';
import { createAppAsyncThunk } from '../hooks';

export const addCompletedTask = createAppAsyncThunk<
  CompletedTask,
  CreateCompletedTask
>('completedTasks/addCompletedTask', async (task, thunkApi) => {
  const newDocRef = doc(collection(db, 'completedTask'));
  return {} as CompletedTask;
});
