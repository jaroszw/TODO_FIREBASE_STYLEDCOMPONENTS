import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "",
  authDomain: "todo-app-firebase-2e314.firebaseapp.com",
  projectId: "todo-app-firebase-2e314",
  storageBucket: "todo-app-firebase-2e314.appspot.com",
  messagingSenderId: "470007365633",
  appId: "1:470007365633:web:0704a8226ca28f3a0bc000",
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase;
