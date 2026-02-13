// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdeYYIOKwwGOgHcAlbDDuG0QCES0Uzczw",
  authDomain: "khetseva-71353.firebaseapp.com",
  projectId: "khetseva-71353",
  storageBucket: "khetseva-71353.appspot.com",
  messagingSenderId: "735433870229",
  appId: "1:735433870229:web:b1ee333c3ed0112ee7849c",
  databaseURL: "https://khetseva-71353-default-rtdb.firebaseio.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);