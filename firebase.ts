// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: process.env.EXPO_PUBLIC_FIREBAS_API,
//   authDomain: 'fire-base-db-90846.firebaseapp.com',
//   projectId: 'fire-base-db-90846',
//   storageBucket: 'fire-base-db-90846.appspot.com',
//   messagingSenderId: '1084251965186',
//   appId: '1:1084251965186:web:aad9371bc24596042a641b',
// };

const firebaseConfig = {
  apiKey: 'AIzaSyAyP71qijklJtOgVJAWh2NDZFzimXl3KAk',
  authDomain: 'redux-code-67ac8.firebaseapp.com',
  projectId: 'redux-code-67ac8',
  storageBucket: 'redux-code-67ac8.appspot.com',
  messagingSenderId: '203754793792',
  appId: '1:203754793792:web:4381c815ba045147de68a5',
  measurementId: 'G-VWJR8LYXM9',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
