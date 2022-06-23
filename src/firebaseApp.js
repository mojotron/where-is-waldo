import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

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

export const logInAdmin = async (userObj) => {
  try {
    console.log("2", userObj);
    const credUser = await signInWithEmailAndPassword(
      auth,
      userObj.email,
      userObj.password
    );
    console.log("3", credUser.user);
    const adminCol = collection(db, "admin");
    const admins = await getDocs(adminCol);
    console.log("4");
    const admin = admins.docs.some(
      (doc) => doc.data().username === userObj.username
    );
    if (admin === false) throw new Error("unknown admin");
    return admin; // returns true for useState in App component for rendering a dashboard
  } catch (error) {
    console.log(error.message);
    signOut(auth);
    throw error;
  }
};
