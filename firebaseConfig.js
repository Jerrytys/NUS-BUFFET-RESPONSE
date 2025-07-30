// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABfcQxfK3gWIr7RJBMTtaFYcsMjm9gCXg",
  authDomain: "food--runner.firebaseapp.com",
  projectId: "food--runner",
  storageBucket: "food--runner.firebasestorage.app",
  messagingSenderId: "830362757484",
  appId: "1:830362757484:web:4cea63542dfe6ec05b2b49",
  measurementId: "G-R9PDQ7C0ZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });

export const db = getFirestore(app);