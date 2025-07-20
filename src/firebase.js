// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
// import { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'; // Example for Firestore
// import { getAnalytics } from "firebase/analytics"; // Uncomment if you need Analytics

import firebaseConfig from './config/firebaseConfig'; // Import the configuration object

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
export const auth = getAuth(app); // Pass the initialized app to getAuth
// export const db = getFirestore(app); // Uncomment if you need Firestore
// export const analytics = getAnalytics(app); // Uncomment if you need Analytics

// Export authentication functions that use the initialized 'auth' instance
export const firebaseSignUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error("Error signing up:", error.message);
    return { success: false, error: error.message };
  }
};

export const firebaseSignIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", userCredential.user);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error("Error signing in:", error.message);
    return { success: false, error: error.message };
  }
};

export const firebaseSignOut = async () => {
  try {
    await signOut(auth);
    console.log("User signed out.");
    return { success: true };
  } catch (error) {
    console.error("Error signing out:", error.message);
    return { success: false, error: error.message };
  }
};

// Export onAuthStateChanged for listeners
export { onAuthStateChanged };

// You can also export other Firestore functions or services here if you initialize them
// export { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc };
