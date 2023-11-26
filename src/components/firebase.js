import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDSgSlEAvb4eTonK0YG7M8sI33qwGHYjK0",
  authDomain: "gif-app-a42f0.firebaseapp.com",
  databaseURL: "https://gif-app-a42f0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gif-app-a42f0",
  storageBucket: "gif-app-a42f0.appspot.com",
  messagingSenderId: "923162105468",
  appId: "1:923162105468:web:6e2dd9dec10d88d0d9dbf9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;