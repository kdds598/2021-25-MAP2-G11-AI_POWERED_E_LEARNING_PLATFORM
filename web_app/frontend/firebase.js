import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,signInAnonymously ,signInWithEmailAndPassword,onAuthStateChanged} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_APIKEY,
  authDomain: import.meta.env.VITE_FB_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECTID,
  storageBucket: import.meta.env.VITE_FB_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FB_APPID,
  measurementId: import.meta.env.VITE_FB_MEASUREMENTID,
};

const  app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export {signInWithEmailAndPassword, onAuthStateChanged};

export const signInAnonymouslyWithFirebase = () => {
  return signInAnonymously(auth);
};