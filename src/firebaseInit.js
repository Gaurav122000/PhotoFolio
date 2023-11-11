// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc9oedwBpYFBNBnxYuHMVcXRgd0o5Cplk",
  authDomain: "photofolio-301b5.firebaseapp.com",
  projectId: "photofolio-301b5",
  storageBucket: "photofolio-301b5.appspot.com",
  messagingSenderId: "8244199913",
  appId: "1:8244199913:web:7337f60514875b34b80b78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);