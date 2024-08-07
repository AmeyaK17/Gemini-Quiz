// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8fiGHApj06YgvLkYqexxdzgbOwclqECY",
  authDomain: "geminiquiz-27423.firebaseapp.com",
  projectId: "geminiquiz-27423",
  storageBucket: "geminiquiz-27423.appspot.com",
  messagingSenderId: "738288251271",
  appId: "1:738288251271:web:66b0d19d981ba07c012322",
  measurementId: "G-JPTL7MFH89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };