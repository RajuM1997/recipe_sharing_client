import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useUser = (email) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    if (!email) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/api/users/user?userEmail=${email}`
      );
      setUserData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    fetchUser();
  }, [email, fetchUser]);

  const refetchUser = () => {
    fetchUser();
  };

  return { userData, loading, error, refetchUser };
};

export default useUser;
