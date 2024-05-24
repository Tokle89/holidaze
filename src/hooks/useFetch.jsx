import { useState, useEffect } from "react";

/**
 *  A custom hook that fetches data from a given URL and returns the data, isLoading, and isError states.
 * @param {String} url - The URL to fetch data from
 * @param {Object} fetchOptions - The fetch options to be used in the fetch request
 * @returns  {Object} - An object containing the data, isLoading, and isError states
 * @example
 * const { data, isLoading, isError } = useFetch("https://api.example.com/data", { method: "GET" });
 */

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
        if (!response.ok) {
          setIsError(true);
        }
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
