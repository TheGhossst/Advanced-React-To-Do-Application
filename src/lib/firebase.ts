import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBY6jQ8-kVQvo2opD9E91jZF0mR_875LNU",
    authDomain: "tic-tac-toe-95823.firebaseapp.com",
    databaseURL: "https://tic-tac-toe-95823-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tic-tac-toe-95823",
    storageBucket: "tic-tac-toe-95823.firebasestorage.app",
    messagingSenderId: "1042127298225",
    appId: "1:1042127298225:web:f36f7ee3dbdbda9c358c90",
    measurementId: "G-WWSLNRSTV5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();