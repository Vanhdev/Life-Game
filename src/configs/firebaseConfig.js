import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyA8WcR0oOkUu_7edYqSXoiCfi5GaCbLJkk",
    authDomain: "fir-autheticate.firebaseapp.com",
    databaseURL: "https://fir-autheticate-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fir-autheticate",
    storageBucket: "fir-autheticate.appspot.com",
    messagingSenderId: "637553991519",
    appId: "1:637553991519:web:2d9d2725c113338154e0ea",
    measurementId: "G-NZ9LKXX4DW"
};

export const firebaseApp = initializeApp(firebaseConfig);