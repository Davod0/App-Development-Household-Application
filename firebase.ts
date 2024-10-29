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
  apiKey: 'AIzaSyBVGpfEBUk1NxR6cQ5Y6mvUVjV3cPBCs-A',
  authDomain: 'whatever-6f2c1.firebaseapp.com',
  projectId: 'whatever-6f2c1',
  storageBucket: 'whatever-6f2c1.appspot.com',
  messagingSenderId: '750619013669',
  appId: '1:750619013669:web:bb870cf589ccc2d9e5c5cc',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
