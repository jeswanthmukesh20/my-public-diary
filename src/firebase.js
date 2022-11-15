// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAAKQK2COsId7EqbLyCmojyJoX2sS6W5CA",
    authDomain: "my-public-diary.firebaseapp.com",
    projectId: "my-public-diary",
    storageBucket: "my-public-diary.appspot.com",
    messagingSenderId: "273091994361",
    appId: "1:273091994361:web:ff37319bc138347b527828",
    measurementId: "G-QCGHP5FTXR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);