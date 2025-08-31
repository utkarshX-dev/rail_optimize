import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  authDomain: "login-682c8.firebaseapp.com",
  projectId: "login-682c8",
  storageBucket: "login-682c8.firebasestorage.app",
  messagingSenderId: "603328145335",
  appId: "1:603328145335:web:8e50ec69f05cc8ace02a32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
