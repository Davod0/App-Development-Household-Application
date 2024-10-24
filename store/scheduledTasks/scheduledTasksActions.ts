import { createAsyncThunk } from '@reduxjs/toolkit';
import { ScheduledTask, CreateScheduledTask } from '../../data';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';

export const fetchScheduledTasks = createAsyncThunk<ScheduledTask[]>(
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

export const addScheduledTaskAsync = createAsyncThunk<
  ScheduledTask,
  CreateScheduledTask
>('scheduledTasks/add', async (newTask) => {
  const tasksCollection = collection(db, 'scheduledTasks');

  // Add the new task to Firestore and get the new document reference
  const docRef = await addDoc(tasksCollection, newTask);

  // Return the new task with the generated ID
  return { id: docRef.id, ...newTask };
});

export const updateScheduledTaskAsync = createAsyncThunk<
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

export const deleteScheduledTaskAsync = createAsyncThunk(
  'scheduledTasks/delete',
  async (taskId: string) => {
    const taskDocRef = doc(db, 'scheduledTasks', taskId);
    await deleteDoc(taskDocRef);
    return taskId;
  },
);
