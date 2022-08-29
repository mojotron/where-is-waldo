import { useReducer, useState, useEffect } from "react";
import { projectStorage } from "../firebase/config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

const initialState = {
  isPending: false,
  error: null,
  success: null,
  imageUrls: null,
};

const storageReducer = (state, action) => {
  switch (action.type) {
    case "IS_PANDING":
      return {
        isPending: true,
        error: null,
        success: false,
        imageUrls: null,
      };
    case "UPLOAD_IMAGE":
      return {
        isPending: false,
        error: null,
        success: true,
        imageUrls: null,
      };
    case "LOAD_IMAGES":
      return {
        isPending: false,
        error: null,
        success: true,
        imageUrls: action.payload,
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
    dispatch({ type: "IS_PENDING" });
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

  const loadImages = async (directory) => {
    dispatch({ type: "IS_PENDING" });

    try {
      listAll(ref(projectStorage, `${directory}/`)).then((response) => {
        return Promise.all(
          response.items.map((imageRef) => getDownloadURL(imageRef))
        ).then((urlsArr) =>
          dispatchIfNotCancelled({ type: "LOAD_IMAGES", payload: urlsArr })
        );
      });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { response, uploadImage, loadImages };
};
