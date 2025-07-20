// src/firebase/index.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Only import getAuth here
// import { getFirestore } from 'firebase/firestore'; // Uncomment if you need Firestore
// import { getAnalytics } from "firebase/analytics"; // Uncomment if you need Analytics

const FirebaseConfigKeys = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(FirebaseConfigKeys);

// Initialize and Export Firebase Services
export const auth = getAuth(app);