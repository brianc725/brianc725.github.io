import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBqINJdrge1lm3bB3xGmfM_2VATpf3aFag",
  authDomain: "personalwebsite2019-d87ab.firebaseapp.com",
  databaseURL: "https://personalwebsite2019-d87ab.firebaseio.com",
  projectId: "personalwebsite2019-d87ab",
  storageBucket: "",
  messagingSenderId: "870102134037",
  appId: "1:870102134037:web:0b714c8e3e279024"
};

class Firebase {
  constructor() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // Load in the firebase functions we need
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.experienceRef = this.db.collection('experiences');
    this.projectsRef = this.db.collection('projects');
    this.socialsRef = this.db.collection('socials');
  }

  handleSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  handleSignOut = () => this.auth.signOut();

  getCurrentUser = () => this.auth.currentUser;

  isUserLoggedIn = () => !!this.auth.currentUser;
}

const fb = new Firebase();

export default fb;