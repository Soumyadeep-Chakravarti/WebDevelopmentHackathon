// src/firebase/authFunctions.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from './index'; // Import the initialized auth instance from src/firebase/index.js

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

export { onAuthStateChanged };
