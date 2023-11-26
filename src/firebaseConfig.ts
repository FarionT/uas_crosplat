// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQ4LQ92k2A0B6o7_UcC-vzcokZyxrLR0w",
  authDomain: "uas-crosplat.firebaseapp.com",
  projectId: "uas-crosplat",
  storageBucket: "uas-crosplat.appspot.com",
  messagingSenderId: "9665971001",
  appId: "1:9665971001:web:8a38a5fe0077741eeadee8",
  measurementId: "G-ZH1T40FCWP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);