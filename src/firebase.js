import firebase from 'firebase/app'
import "firebase/auth"
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBuB7MDK9g7xIRR2BCmiSlkr88A8ePGZDw",
  authDomain: "crud-react-8f0d9.firebaseapp.com",
  projectId: "crud-react-8f0d9",
  storageBucket: "crud-react-8f0d9.appspot.com",
  messagingSenderId: "430159137302",
  appId: "1:430159137302:web:3cd6682faf19b0b4a74337"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage()
 
export {firebase, auth, db, storage}