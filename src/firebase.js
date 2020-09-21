import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBS4qUzobPsm-g4KeC1e8Uh1m8hCWRCQLY",
    authDomain: "daily-notes-for-all.firebaseapp.com",
    databaseURL: "https://daily-notes-for-all.firebaseio.com",
    projectId: "daily-notes-for-all",
    storageBucket: "daily-notes-for-all.appspot.com",
    messagingSenderId: "585738385036",
    appId: "1:585738385036:web:0db961bc36ccd76b732da9",
    measurementId: "G-JCG20ZK55W"
});

const db = firebaseApp.firestore();

export default db;