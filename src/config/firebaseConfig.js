// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJNem2f-QINgdh5lbG-i3TM0vpK0tRetg",
  authDomain: "album-app-1f03b.firebaseapp.com",
  databaseURL:
    "https://album-app-1f03b-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "album-app-1f03b",
  storageBucket: "album-app-1f03b.appspot.com",
  messagingSenderId: "722561006509",
  appId: "1:722561006509:web:5bd0099b45e65b4f46bf24",
};

export default firebaseConfig;

const app = initializeApp(firebaseConfig);

export const BASE_DB_URL = firebaseConfig.databaseURL;
export const SIGN_UP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`;
export const SIGN_IN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`;
