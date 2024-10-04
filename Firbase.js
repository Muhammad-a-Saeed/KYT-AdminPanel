// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2BSPa-7N2TVHeXVF8qgbePgsTTSRdCwU",
    authDomain: "mamvo-ece7c.firebaseapp.com",
    projectId: "mamvo-ece7c",
    storageBucket: "mamvo-ece7c.appspot.com",
    messagingSenderId: "92973546222",
    appId: "1:92973546222:web:93e73f0bf3e62cda4d51ff"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;