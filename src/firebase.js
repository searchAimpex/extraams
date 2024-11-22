
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCljzcaql3kDDJA5_CIxGf5Kb7MP1QVbgs",
  authDomain: "ams-v1-873eb.firebaseapp.com",
  projectId: "ams-v1-873eb",
  storageBucket: "ams-v1-873eb.appspot.com",
  messagingSenderId: "1016518889301",
  appId: "1:1016518889301:web:4bfa92fbf7e96b369d29dc",
  measurementId: "G-2NKF1K4R2D"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);