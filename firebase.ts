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
  apiKey: 'AIzaSyDAmnvCTQSsPK3hOnv6O7W77_vW0VZoChk',
  authDomain: 'app-developement-household.firebaseapp.com',
  projectId: 'app-developement-household',
  storageBucket: 'app-developement-household.appspot.com',
  messagingSenderId: '300417995379',
  appId: '1:300417995379:web:8a05d0c54c123879909006',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
