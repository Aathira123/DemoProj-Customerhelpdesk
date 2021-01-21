import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
var firebaseConfig = {
    apiKey: "AIzaSyAQu7OqUKfsrf7QTwms1sEt4D5NPGtbn0U",
    authDomain: "customer-service-desk-979c0.firebaseapp.com",
    projectId: "customer-service-desk-979c0",
    storageBucket: "customer-service-desk-979c0.appspot.com",
    messagingSenderId: "274210327909",
    appId: "1:274210327909:web:1a102413afbfda9bd2258c"
  };

 
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }
  export const auth = firebase.auth();
export const firestore = firebase.firestore();

