import { useState } from "react";

const useLazyFetch = () => {
  const [response, setResponse] = useState(null);
  const [isError, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const doFetch = async (url, options) => {
    setIsLoading(true);
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        console.log("res", res);
      }
      if (res.status === 204) {
        console.log("Delete successful");
        setResponse({ message: "Delete successful" });
      } else {
        const json = await res.json();
        console.log("json", json);
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
