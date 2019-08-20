import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBqINJdrge1lm3bB3xGmfM_2VATpf3aFag",
    authDomain: "personalwebsite2019-d87ab.firebaseapp.com",
    databaseURL: "https://personalwebsite2019-d87ab.firebaseio.com",
    projectId: "personalwebsite2019-d87ab",
    storageBucket: "",
    messagingSenderId: "870102134037",
    appId: "1:870102134037:web:0b714c8e3e279024"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;