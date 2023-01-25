import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBklonu4IlIAkYAbqOariUyuj2QU86is8k",
  authDomain: "knwl-d295a.firebaseapp.com",
  projectId: "knwl-d295a",
  storageBucket: "knwl-d295a.appspot.com",
  messagingSenderId: "35313808604",
  appId: "1:35313808604:web:892c7cf16fcd793557b019",
  measurementId: "G-70JLFRSV51",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
