import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA10tJctbq6qQeMWKWMD8ns8UbFJ-2cSwM",
  authDomain: "datasetgenui.firebaseapp.com", 
  projectId: "datasetgenui",
  storageBucket: "datasetgenui.firebasestorage.app",
  messagingSenderId: "682594501244",
  appId: "1:682594501244:web:926f7f9fcf9805357efff9",
  measurementId: "G-7ZRJYCZ2EM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
