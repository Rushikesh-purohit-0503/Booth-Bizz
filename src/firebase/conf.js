import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut  } from 'firebase/auth';
import { getFirestore,setDoc,doc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
// Your Firebase config object
const firebaseConfig = {
    apiKey: "AIzaSyAn110d1t1HmzJCRDA4Eg9bINs97RXeE2c",
    authDomain: "boothbiz.firebaseapp.com",
    projectId: "boothbiz",
    storageBucket: "boothbiz.appspot.com",
    messagingSenderId: "919720900941",
    appId: "1:919720900941:web:dd66076d909018c0679f04"
    
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app)
export { auth, provider, db, signInWithPopup, signOut,updateProfile };
