import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firbaseApp = initializeApp({
  apiKey: "AIzaSyBoLWK2atewjcfFsNlaLRzJ9TiDMeb-fZY",
  authDomain: "where-is-waldo-3d6cd.firebaseapp.com",
  projectId: "where-is-waldo-3d6cd",
  storageBucket: "where-is-waldo-3d6cd.appspot.com",
  messagingSenderId: "361295168486",
  appId: "1:361295168486:web:e38e46e63b39f7b7150c27",
});

const auth = getAuth(firbaseApp);
const db = getFirestore(firbaseApp);
const storage = getStorage(firbaseApp);

export const logInAdmin = async (userObj) => {
  try {
    await signInWithEmailAndPassword(auth, userObj.email, userObj.password);
    const adminCol = collection(db, "admin");
    const admins = await getDocs(adminCol);
    const admin = admins.docs.some(
      (doc) => doc.data().username === userObj.username
    );
    if (admin === false) throw new Error("unknown admin");
    return admin; // returns true for useState in App component for rendering a dashboard
  } catch (error) {
    signOut(auth);
    throw error;
  }
};

export const uploadImageToStorage = async (directory, imgObj) => {
  const imgRef = ref(storage, `${directory}/${imgObj.name}`);
  uploadBytes(imgRef, imgObj);
};
