// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJ75O8h-G_BArhCiog7ZtPzVQzWSMsKQ8",
  authDomain: "hospital-services-c180b.firebaseapp.com",
  projectId: "hospital-services-c180b",
  storageBucket: "hospital-services-c180b.appspot.com",
  messagingSenderId: "212571016816",
  appId: "1:212571016816:web:757e4b0ed14ab557feaeb5",
  measurementId: "G-H8L3213ENR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default getFirestore();
export const db = getFirestore(app);
export const storage = getStorage(app);