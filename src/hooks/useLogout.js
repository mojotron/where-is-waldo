import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { projectAuth } from "../firebase/config";
import { signOut } from "firebase/auth";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPanding] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPanding(true);
    try {
      await signOut(projectAuth);
      dispatch({ type: "LOGOUT" });
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

  return { isPending, error, logout };
};
