import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { CreateTask, Task } from '../../types';
import { createAppAsyncThunk } from '../hooks';

// Lägger till en task till ett hushåll
export const addTask = createAppAsyncThunk<Task, CreateTask>(
  'tasks/addTask',
  async (taskData, thunkApi) => {
    const state = thunkApi.getState();
    const newDocRef = doc(collection(db, 'tasks'));
    if (!state.user.selectedHousehold) {
      return thunkApi.rejectWithValue(
        `Error writing to database, no household selected`,
      );
    }
    const householdId = state.user.selectedHousehold.id;

    const data: Task = {
      id: newDocRef.id,
      householdId: householdId,
      isArchived: false,
      ...taskData,
    };

    try {
      await setDoc(newDocRef, data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        `Error writing to database, tasks ${error}`,
      );
    }
  },
);

// Hämtar alla tasks TODO: behövs inte i slutet
export const getTasks = createAppAsyncThunk<Task[]>(
  'tasks/get',
  async (_, thunkAPI) => {
    try {
      const snapshot = await getDocs(collection(db, 'tasks'));
      const data: Task[] = [];
      snapshot.forEach((doc) => data.push(doc.data() as Task));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        `Error reading from database, tasks ${error}`,
      );
    }
  },
);

// Hämtar alla tasks till ett hushåll, filtrerar på hushålls id
// FEL FIXA: VART FILTERAS BORT TASK DÅ ???
export const getSelectedHouseholdTasks = createAppAsyncThunk<Task[], string>(
  'task/householdID/get',
  async (_, thunkAPI) => {
    try {
      const snapshot = await getDocs(collection(db, 'tasks'));
      const data: Task[] = [];
      snapshot.forEach((doc) => data.push(doc.data() as Task));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        `Error reading from database, tasks ${error}`,
      );
    }
  },
);

// Uppdaterar en task (kan även sätta isArchived till true för att "deleta en task")
// man skickar in de delarna av tasken man vill ändra, det som inte ska ändras blir behåller samma värden
export const updateTask = createAppAsyncThunk<
  Task,
  { id: string; updates: Partial<Task> }
>('tasks/updateTask', async ({ id, updates }, thunkAPI) => {
  try {
    const taskRef = doc(db, 'tasks', id);
    await updateDoc(taskRef, updates);

    return { id, ...updates } as Task;
  } catch (error) {
    return thunkAPI.rejectWithValue(`Error updating task: ${error}`);
  }
});
