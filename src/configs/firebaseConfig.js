import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAyWY5SvPMytslZ6KgCfiq9NpY0uuFxuMg",
    authDomain: "fir-authenticate-db399.firebaseapp.com",
    databaseURL: "https://fir-authenticate-db399-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fir-authenticate-db399",
    storageBucket: "fir-authenticate-db399.appspot.com",
    messagingSenderId: "277708109924",
    appId: "1:277708109924:web:3ac938147457939a544771",
    measurementId: "G-SQHQVHY7W4"
};

export const firebaseApp = initializeApp(firebaseConfig);