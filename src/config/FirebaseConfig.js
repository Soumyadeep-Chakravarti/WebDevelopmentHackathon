// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGLpZr5-YwuesTpqIx-vk8hef2OEpubfI",
  authDomain: "diesel-polymer-455412-i5.firebaseapp.com",
  projectId: "diesel-polymer-455412-i5",
  storageBucket: "diesel-polymer-455412-i5.firebasestorage.app",
  messagingSenderId: "351854096945",
  appId: "1:351854096945:web:5b785118ef29ff087a5b10",
  measurementId: "G-VG1PVWDZQY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
