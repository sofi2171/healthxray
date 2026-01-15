import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-IHlzbrwVslB_FHzNV7WM-GL6FCcc4jw",
  authDomain: "healthxray-f5845.firebaseapp.com",
  projectId: "healthxray-f5845",
  storageBucket: "healthxray-f5845.firebasestorage.app",
  messagingSenderId: "440134122247",
  appId: "1:440134122247:web:525a26fb280442482fa3a2",
  measurementId: "G-H5RFE34K4L"
};

// Prevent multiple initializations in dev
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Suggestion: Add your production domain to Firebase console "Authorized Domains"
// Settings -> Authentication -> Settings -> Authorized Domains