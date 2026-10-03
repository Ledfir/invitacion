// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDto0Hq4Gsf1zNJkYzL7e_tGIoG8-beBbk",
  authDomain: "invitacion-victoria-f1f17.firebaseapp.com",
  projectId: "invitacion-victoria-f1f17",
  storageBucket: "invitacion-victoria-f1f17.firebasestorage.app",
  messagingSenderId: "347328486316",
  appId: "1:347328486316:web:40b9cb2afd3ba6390f7809"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);