// CMND + A file, and uncomment (if using firebase auth)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// console.log('FIREBASE\n.\n.\n.\n.\n.\n.\n..........................', 'ENV test', process.env.TEST)
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfEI705e4SYq-aUz1BPRZdwUChOQqDQ_s",
  authDomain: "menssite-49101.firebaseapp.com",
  projectId: "menssite-49101",
  storageBucket: "menssite-49101.appspot.com",
  messagingSenderId: "313313743383",
  appId: "1:313313743383:web:e5b66264b9fd0915b90252",
  measurementId: "G-23LZ9077T1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };