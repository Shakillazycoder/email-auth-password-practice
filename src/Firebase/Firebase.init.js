// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMF3e0cO0HCavUwVQEXlDcnaQAA3IHD_0",
  authDomain: "email-pass-auth-practice-e35d0.firebaseapp.com",
  projectId: "email-pass-auth-practice-e35d0",
  storageBucket: "email-pass-auth-practice-e35d0.appspot.com",
  messagingSenderId: "184451824953",
  appId: "1:184451824953:web:6f77b9985fc350b8d1bce8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;