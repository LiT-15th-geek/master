import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCg_PK5PqDdJnG0TnZf4nbIvZj86V99fuM",
  authDomain: "lit-15th-geek.firebaseapp.com",
  projectId: "lit-15th-geek",
  storageBucket: "lit-15th-geek.appspot.com",
  messagingSenderId: "997291043647",
  appId: "1:997291043647:web:3f112d900f2e0cacce818a",
  measurementId: "G-PEFQ2BJL16",
};

const app = getApps()?.length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
