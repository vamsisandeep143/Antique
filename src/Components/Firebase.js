// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, onAuthStateChanged,updateProfile} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore';
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
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
const storage = getStorage();

export const auth = getAuth();
export const db = getFirestore(app);


export function useAuth() {
 const [currentUser, setCurrentUser] = useState();
 console.log(currentUser);

 useEffect(() => {

const unsub = onAuthStateChanged(auth,user => setCurrentUser(user));
return unsub;

 },[]);

 return currentUser;
}

export async function upload(file,currentUser,setLoading){
const fileRef = ref(storage,'ProfilePic/'+currentUser.uid + '.jpg');
setLoading(true);
const snapshot = await uploadBytes(fileRef,file)

const photoURL = await getDownloadURL(fileRef);
await updateProfile(currentUser, { photoURL });
setLoading(false);
alert('uploaded file');
}


export default app;
