// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDKZtayK_jYblFn5MAoInE-NgZRlBd5-g",
  authDomain: "recipehub-b764e.firebaseapp.com",
  projectId: "recipehub-b764e",
  storageBucket: "recipehub-b764e.appspot.com",
  messagingSenderId: "609011871120",
  appId: "1:609011871120:web:fb708565526912fb639715"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

// Export the services so they can be used elsewhere
export { db, auth, storage };
