// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBHvn87nlTYspKyf0MTQ9Ger_Lk4IxNQ6E",
    authDomain: "reactnativebackoffi.firebaseapp.com",
    projectId: "reactnativebackoffi",
    storageBucket: "reactnativebackoffi.appspot.com",
    messagingSenderId: "689869979478",
    appId: "1:689869979478:web:792aae41cb50699be5e0f7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
