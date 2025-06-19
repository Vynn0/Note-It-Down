// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByIR-UQm-eJL_ewYnmlXCY0bAZq9HGDs0",
  authDomain: "noteitdown-edc45.firebaseapp.com",
  projectId: "noteitdown-edc45",
  storageBucket: "noteitdown-edc45.appspot.com", // typo sebelumnya: firebasestorage.app
  messagingSenderId: "1031224153095",
  appId: "1:1031224153095:web:1c34d919bc2816043346a2",
  // measurementId: "G-NC2PRWJEFB" // boleh dihapus, tidak dipakai di RN
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);