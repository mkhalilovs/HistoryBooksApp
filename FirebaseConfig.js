import firebase from 'firebase/compat';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// need to run: npm install --save firebase
// We will use the JS SDK with React Native

var firebaseConfig = {
  apiKey: "AIzaSyAnWW3Z_iZkQ84tdlcNq60WhtaAeqGfdJw",
  authDomain: "project-c5a91.firebaseapp.com",
  projectId: "project-c5a91",
  storageBucket: "project-c5a91.appspot.com",
  messagingSenderId: "1020729380125",
  appId: "1:1020729380125:web:50f72bf9e6d5ce0c1765f4"
};

var app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}else {
  app = firebase.app(); // if already initialized, use that one
}

export const db = firebase.firestore();
export const firestore = firebase.firestore(app);
export const auth = firebase.auth(app);