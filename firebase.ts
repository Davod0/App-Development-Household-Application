// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBAS_API,
  authDomain: 'fire-base-db-90846.firebaseapp.com',
  projectId: 'fire-base-db-90846',
  storageBucket: 'fire-base-db-90846.appspot.com',
  messagingSenderId: '1084251965186',
  appId: '1:1084251965186:web:aad9371bc24596042a641b',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
