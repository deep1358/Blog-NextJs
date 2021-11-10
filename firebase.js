import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

var firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

if(firebase && !firebase.apps.length)
  firebase.initializeApp(firebaseConfig)

const auth = firebase && firebase.auth()
const db = firebase && firebase.firestore()
const storage = firebase && firebase.storage()
const serverTimestamp = firebase && firebase.firestore.FieldValue.serverTimestamp

export {auth,db,storage,serverTimestamp}