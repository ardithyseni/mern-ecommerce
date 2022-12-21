// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHREzSDqFXi5EM9PcSD4PBU6H2FtqrzsI",
  authDomain: "mern-ecomm-d9b5a.firebaseapp.com",
  projectId: "mern-ecomm-d9b5a",
  storageBucket: "mern-ecomm-d9b5a.appspot.com",
  messagingSenderId: "623592738433",
  appId: "1:623592738433:web:3354d0c1f0766d5b190780"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export the auth 
export const auth = getAuth(app);