import { useState, useEffect } from "react";

const useFetch = (url, fetchOptions) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (!url) return;
      try {
        const response = await fetch(url, fetchOptions);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url, fetchOptions]);
  return { data, isLoading, isError };
};

export default useFetch;
