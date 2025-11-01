// src/firebase/config.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAm7_aWUexpAyBEJlOj2hTHMbEXIrDF4Dw",
  authDomain: "synnectify-63e1d.firebaseapp.com",
  projectId: "synnectify-63e1d",
  storageBucket: "synnectify-63e1d.firebasestorage.app",
  messagingSenderId: "982221510813",
  appId: "1:982221510813:web:54245bd65f5294e8e69c74",
  measurementId: "G-ZDV7H6MEQL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Analytics (only in browser)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };
export default app;