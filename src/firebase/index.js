import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBpkLe7lgiL_5d1_ZJXWg-k5LcV3WOVCqg",
  authDomain: "mytodolist-a9529.firebaseapp.com",
  projectId: "mytodolist-a9529",
  storageBucket: "mytodolist-a9529.appspot.com",
  messagingSenderId: "116635676320",
  appId: "1:116635676320:web:b0f622cf5ff6d4b94fa3c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{
    db
}