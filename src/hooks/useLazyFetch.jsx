import { useState, useEffect } from "react";

const useLazyFetch = (initialUrl = "", initialOptions = {}) => {
  const [url, setUrl] = useState(initialUrl);
  const [options, setOptions] = useState(initialOptions);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const doFetch = (url, options) => {
    setUrl(url);
    setOptions(options);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [url, options]);

  return { response, error, isLoading, doFetch };
};

export default useLazyFetch;
