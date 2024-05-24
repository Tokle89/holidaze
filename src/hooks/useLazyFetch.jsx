import { useState } from "react";

/**
 * A custom hook that fetches data lazily, by using the doFetch function to send a fetch request to the server.
 * It returns the response, isError, isLoading, and doFetch function.
 * @returns {Object} - An object containing the response, isError, isLoading, and doFetch function.
 * @example
 * const { response, isError, isLoading, doFetch } = useLazyFetch();
 * doFetch("https://api.example.com/data", { method: "GET" });
 *
 */

const useLazyFetch = () => {
  const [response, setResponse] = useState(null);
  const [isError, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const doFetch = async (url, options) => {
    setIsLoading(true);
    try {
      const res = await fetch(url, options);

      if (res.status === 204) {
        console.log("Delete successful");
        setResponse({ message: "Delete successful" });
      } else {
        const json = await res.json();
        setResponse(json);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error);
    }
  };
  return { response, isError, isLoading, doFetch };
};

export default useLazyFetch;
