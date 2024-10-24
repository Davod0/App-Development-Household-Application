import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { CreateTask, Task } from '../../data';
import { db } from '../../firebase';
import { createAppAsyncThunk } from '../hooks';

export const addTask = createAppAsyncThunk<Task, CreateTask>(
  'tasks/addTask',
  async (taskData, thunkApi) => {
    const state = thunkApi.getState();
    const newDocRef = doc(collection(db, 'tasks'));
    if (!state.households.selectedHousehold) {
      return thunkApi.rejectWithValue(
        `Error writing to database, no household selected`,
      );
    }
    const householdId = state.households.selectedHousehold.id;

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
