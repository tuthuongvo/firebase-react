// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUR8KHPF09qDTBgEBk0Wk-aKXp-4jVR7w",
  authDomain: "fir-reac-auth.firebaseapp.com",
  projectId: "fir-reac-auth",
  storageBucket: "fir-reac-auth.appspot.com",
  messagingSenderId: "354118256805",
  appId: "1:354118256805:web:a477a4deabe32ba655254c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =  getAuth(app);
export const googleProvider = new GoogleAuthProvider();