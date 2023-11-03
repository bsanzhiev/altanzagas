// Import the functions you need from the SDKs you need
import { error } from "console";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDzhk5tUbfO-M4kpFdtoWmeD0cn_hiSMUo",
	authDomain: "tsurhai-2a88b.firebaseapp.com",
	projectId: "tsurhai-2a88b",
	storageBucket: "tsurhai-2a88b.appspot.com",
	messagingSenderId: "362614829642",
	appId: "1:362614829642:web:5fee48232417c0cecbecb3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
