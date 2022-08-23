import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBoLWK2atewjcfFsNlaLRzJ9TiDMeb-fZY",
  authDomain: "where-is-waldo-3d6cd.firebaseapp.com",
  projectId: "where-is-waldo-3d6cd",
  storageBucket: "where-is-waldo-3d6cd.appspot.com",
  messagingSenderId: "361295168486",
  appId: "1:361295168486:web:e38e46e63b39f7b7150c27",
};

const firebaseApp = initializeApp(firebaseConfig);
// initilize firbase autentication
const projectAuth = getAuth(firebaseApp);
// initialize firebase storage
const projectStorage = getStorage(firebaseApp);

export { projectAuth, projectStorage };
