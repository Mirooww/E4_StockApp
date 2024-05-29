// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_FIREBASE_KEY } from "@env";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.API_FIREBASE_KEYAPI_FIREBASE_KEY,
    authDomain: "e5-react-native.firebaseapp.com",
    projectId: "e5-react-native",
    storageBucket: "e5-react-native.appspot.com",
    messagingSenderId: "444002362486",
    appId: "1:444002362486:web:8192bb1b9b3df5dc5ceb57",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);
export { auth, db };
