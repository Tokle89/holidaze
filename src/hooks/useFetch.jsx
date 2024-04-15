import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [result, setResult] = useState([]);
  const [isLoading, setIslLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIslLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setResult(json);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIslLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { result, isLoading, isError };
};

export default useFetch;
