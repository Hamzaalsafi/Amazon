// Import only what you need from the modular SDK
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAyW0L5W0EpTzi_fPD08soEWoZgKz35PCE",
    authDomain: "fir-28b95.firebaseapp.com",
    projectId: "fir-28b95",
    storageBucket: "fir-28b95.appspot.com",
    messagingSenderId: "691721233360",
    appId: "1:691721233360:web:b9362674db1fb5048e8fd5",
    measurementId: "G-XZP1HY0HQ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);  
const db = getFirestore(app);     

export { db };
