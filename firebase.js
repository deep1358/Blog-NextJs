import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

var firebaseConfig = {
    apiKey: "AIzaSyB9Bo-YOb62r3BZ8Rg-pbvxeuZoW-P2VT0",
    authDomain: "blog-nextjs-2b1d9.firebaseapp.com",
    projectId: "blog-nextjs-2b1d9",
    storageBucket: "blog-nextjs-2b1d9.appspot.com",
    messagingSenderId: "749413705166",
    appId: "1:749413705166:web:68c4774b379b3f0bd9379f"
  };

  if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig)}

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp

export {auth,db,storage,serverTimestamp}