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
  console.log(action);
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
      console.log(2);
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
      const imageURLS = [];
      listAll(ref(projectStorage, `${directory}/`))
        .then((response) => {
          response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
              imageURLS.push(url);
            });
          });
        })
        .then(() => {
          console.log(1);
          dispatchIfNotCancelled({ type: "LOAD_IMAGES", payload: imageURLS });
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
