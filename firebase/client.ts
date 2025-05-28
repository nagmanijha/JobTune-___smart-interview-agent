
import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBP6rptO0JH8klghG9zdMSt79B5raY16SI",
  authDomain: "jobtune-b7616.firebaseapp.com",
  projectId: "jobtune-b7616",
  storageBucket: "jobtune-b7616.firebasestorage.app",
  messagingSenderId: "104182390530",
  appId: "1:104182390530:web:fa9d6179c430ef9473ec1b",
  measurementId: "G-P47VBY3JK6"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
