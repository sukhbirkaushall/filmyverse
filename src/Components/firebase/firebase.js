import { initializeApp } from "firebase/app";
import {getFirestore, collection} from'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB6i6Gb6D6A__40OXoBOKr0dkM5_1qtKxo",
  authDomain: "filmyverse-5fb9c.firebaseapp.com",
  projectId: "filmyverse-5fb9c",
  storageBucket: "filmyverse-5fb9c.appspot.com",
  messagingSenderId: "544895659423",
  appId: "1:544895659423:web:6fc1b57b6d155df63821aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);
export const moviesRef=collection(db,"movies");
export const reviewsRef = collection(db, "reviews");
export default app;

