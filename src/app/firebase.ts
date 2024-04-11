// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYiHpdqyJcUYZHnwfFBTwnApmpBxH2s6c",
  authDomain: "triluxointernass.firebaseapp.com",
  projectId: "triluxointernass",
  storageBucket: "triluxointernass.appspot.com",
  messagingSenderId: "562008938012",
  appId: "1:562008938012:web:785e900cf7049976a331d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);



