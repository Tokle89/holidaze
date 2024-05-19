import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import Urls from "../constants/url";

const useSearch = (searchTerm) => {
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);

  const { data, error, isLoading } = useFetch(`${Urls.venuesUrl}?page=${page}`);
  useEffect(() => {
    if (data?.data && results.length < 300 && page < 5) {
      setResults((prevResults) => [...prevResults, ...data.data]);
      setPage((prevPage) => prevPage + 1);
    }
  }, [data, results.length, page]);

  const searchResults = searchTerm
    ? results.filter((result) => {
        let { name, description, location } = result;
        let { city, country } = location;
        let searchArray = [name, description, city, country];
        return searchArray.some((item) => item && item.toLowerCase().includes(searchTerm));
      })
    : [];
  return { searchResults, isLoading, error };
};

export default useSearch;
