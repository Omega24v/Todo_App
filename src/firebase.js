import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDkJT3jX-UG5f6UaCvw08cAgZX1Wv59s88",
  authDomain: "todoapp-55f0b.firebaseapp.com",
  databaseURL: "https://todoapp-55f0b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todoapp-55f0b",
  storageBucket: "todoapp-55f0b.firebasestorage.app",
  messagingSenderId: "481244250996",
  appId: "1:481244250996:web:2a0ed993ab354163ade221",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
