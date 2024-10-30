// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBAS_API,
  authDomain: 'bank-app-b6a7e.firebaseapp.com',
  projectId: 'bank-app-b6a7e',
  storageBucket: 'bank-app-b6a7e.firebasestorage.app',
  messagingSenderId: '818458394377',
  appId: '1:818458394377:web:cb742f8b0cbaf30da21dd8',
  measurementId: 'G-J7RCPH4077',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
