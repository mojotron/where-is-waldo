import { useReducer, useState, useEffect } from "react";
import { projectStorage } from "../firebase/config";
import { ref, uploadBytes } from "firebase/storage";

const initialState = {
  isPending: false,
  error: null,
  success: null,
  imageUrl: null,
};

const storageReducer = (state, action) => {
  switch (action.type) {
    case "IS_PANDING":
      return {
        isPending: true,
        error: null,
        success: false,
        imageUrl: null,
      };
    default:
      return state;
  }
};

export const useStorage = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [response, dispatch] = useReducer(storageReducer, initialState);

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const uploadImage = async (directory, file) => {
    dispatch("IS_PENDING");
    try {
      await uploadBytes(
        ref(projectStorage, `/${directory}/${file.name}`),
        file
      );
      dispatchIfNotCancelled({ type: "UPLOAD_IMAGE" });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { response, uploadImage };
};
