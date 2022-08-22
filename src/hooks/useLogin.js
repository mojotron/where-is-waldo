import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { projectAuth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPanding] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPanding(true);
    try {
      const response = await signInWithEmailAndPassword(
        projectAuth,
        email,
        password
      );

      dispatch({ type: "LOGIN", payload: response.user });
      if (!isCancelled) {
        setError(null);
        setIsPanding(false);
      }
    } catch (error) {
      if (!isCancelled) {
        console.error(error.message);
        setIsPanding(false);
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { isPending, error, login };
};
