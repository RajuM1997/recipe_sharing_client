import { useEffect, useState } from "react";
import axios from "axios";

const useFetchInf = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData((prevData) => [...prevData, ...res.data]);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, reFetch: fetchData };
};

export default useFetchInf;
