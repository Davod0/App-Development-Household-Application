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

// const firebaseConfig = {
//   apiKey: 'AIzaSyC7PjAoNtdm73-NzFJk28JP2xfFZNxCTOQ',
//   authDomain: 'suvnet23-bankvalet.firebaseapp.com',
//   projectId: 'suvnet23-bankvalet',
//   storageBucket: 'suvnet23-bankvalet.appspot.com',
//   messagingSenderId: '378442800150',
//   appId: '1:378442800150:web:f9049da775c9bcae3ae937',
// };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
