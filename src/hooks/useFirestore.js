import { useEffect, useReducer, useState } from "react";
import { projectFirestore } from "../firebase/config";
import { addDoc, collection, Timestamp } from "firebase/firestore";

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const fierstoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { document: null, isPending: true, error: null, success: null };
    case "ERROR":
      return {
        document: null,
        isPending: false,
        error: action.payload,
        success: null,
      };
    case "ADD_DOCUMENT":
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };
    default:
      return state;
  }
};

export const useFirestore = (collectionName) => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [response, dispatch] = useReducer(fierstoreReducer, initialState);
  const ref = collection(projectFirestore, collectionName);

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const addDocument = async (data) => {
    console.log("x", data);
    dispatch({ type: "IS_PENDING" });
    try {
      const createdAt = Timestamp.fromDate(new Date());
      const newDocument = await addDoc(ref, { ...data, createdAt });
      console.log(newDocument);
      dispatchIfNotCancelled({ type: "ADD_DOCUMENT", payload: newDocument });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { response, addDocument };
};
