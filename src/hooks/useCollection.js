import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export const useCollection = (collectionName) => {
  const [documents, setDocuments] = useState(null);
  const [isPending, setIsPanding] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPanding(true);
    const colRef = collection(projectFirestore, collectionName);

    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        const results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setDocuments(results);
        setIsPanding(false);
        setError(null);
      },
      (error) => {
        setIsPanding(false);
        setError(error.message);
      }
    );

    return () => unsubscribe();
  }, [collectionName]);

  return { documents, isPending, error };
};
