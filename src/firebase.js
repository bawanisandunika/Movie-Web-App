import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEOyPvxqUrgq3WQXr14BRWbWmUsTg9gN8",
  authDomain: "moviewebapp-f41a6.firebaseapp.com",
  projectId: "moviewebapp-f41a6",
  storageBucket: "moviewebapp-f41a6.appspot.com",
  messagingSenderId: "791776980989",
  appId: "1:791776980989:web:a7ade9bbc11b11966db394"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;