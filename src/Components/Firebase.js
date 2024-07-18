// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore';
import { useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_J-Q1KWJO7zT3qan-hP-PD47p5F_RvJU",
  authDomain: "login-app-69da8.firebaseapp.com",
  projectId: "login-app-69da8",
  storageBucket: "login-app-69da8.appspot.com",
  messagingSenderId: "147814308739",
  appId: "1:147814308739:web:edd1af8e4044deb2bc74b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);

export function useAuth() {
 const [currentUser, setCurrentUser] = useState();
 console.log(currentUser);

 useEffect(() => {

const unsub = onAuthStateChanged(auth,user => setCurrentUser(user));
return unsub;

 },[]);


}


export default app;