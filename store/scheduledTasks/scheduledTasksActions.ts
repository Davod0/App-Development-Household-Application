import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { CreateScheduledTask, ScheduledTask } from '../../types';
import { createAppAsyncThunk } from '../hooks';

export const fetchScheduledTasks = createAppAsyncThunk<ScheduledTask[]>(
  'scheduledTasks/fetchAll',
  async () => {
    const tasksCollection = collection(db, 'scheduledTasks');
    const taskSnapshot = await getDocs(tasksCollection);
    const tasks: ScheduledTask[] = taskSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ScheduledTask[];

    return tasks;
  },
);

export const addScheduledTaskAsync = createAppAsyncThunk<
  ScheduledTask,
  CreateScheduledTask
>('scheduledTasks/add', async (newTask) => {
  const tasksCollection = collection(db, 'scheduledTasks');

  // Add the new task to Firestore and get the new document reference
  const docRef = await addDoc(tasksCollection, newTask);

  // Return the new task with the generated ID
  return { id: docRef.id, ...newTask };
});

export const updateScheduledTaskAsync = createAppAsyncThunk<
  ScheduledTask,
  ScheduledTask
>('scheduledTasks/update', async (updatedTask) => {
  const taskDoc = doc(db, 'scheduledTasks', updatedTask.id);

  // Update the task in Firestore
  await updateDoc(taskDoc, {
    memberId: updatedTask.memberId,
    taskId: updatedTask.taskId,
  });

  return updatedTask;
});

export const deleteScheduledTaskAsync = createAppAsyncThunk(
  'scheduledTasks/delete',
  async (taskId: string) => {
    const taskDocRef = doc(db, 'scheduledTasks', taskId);
    await deleteDoc(taskDocRef);
    return taskId;
  },
);
