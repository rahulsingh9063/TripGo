import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAtW0pdlz1Hu32RDgxXcrVsorNHu0KpgWU",
  authDomain: "project-8a807.firebaseapp.com",
  projectId: "project-8a807",
  storageBucket: "project-8a807.appspot.com", // corrected 
  messagingSenderId: "1068866833483",
  appId: "1:1068866833483:web:b16c1f30e5427aaeaa11ce",
  measurementId: "G-DHJJN732Y1"
};

// ✅ Check if Firebase is already initialized
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); // use the existing one
}

// ✅ Initialize Auth safely
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (error) {
  auth = getAuth(app); // fallback if already initialized
}

// ✅ Export instances
export { app, auth };
export const db = getFirestore(app);
