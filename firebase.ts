// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBAS_API,
  authDomain: 'fire-base-db-90846.firebaseapp.com',
  projectId: 'fire-base-db-90846',
  storageBucket: 'fire-base-db-90846.appspot.com',
  messagingSenderId: '1084251965186',
  appId: '1:1084251965186:web:aad9371bc24596042a641b',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
