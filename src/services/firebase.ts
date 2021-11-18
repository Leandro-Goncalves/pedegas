import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyDiU-s2z1CexXfBwGi8-znqtx7b4KYHUv8",
  authDomain: "full-fuel-5d746.firebaseapp.com",
  databaseURL: "https://full-fuel-5d746-default-rtdb.firebaseio.com",
  projectId: "full-fuel-5d746",
  storageBucket: "full-fuel-5d746.appspot.com",
  messagingSenderId: "750883707670",
  appId: "1:750883707670:web:2f1bc3093ccfeff7718e37",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database };
