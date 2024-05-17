import CustomButton from "../Button";
import Urls from "../../constants/url";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Search = () => {
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const { data, error, isLoading } = useFetch(`${Urls.venuesUrl}?page=${page}`);

  useEffect(() => {
    if (data?.data && results.length < 300 && page < 5) {
      setResults((prevResults) => [...prevResults, ...data.data]);
      setPage((prevPage) => prevPage + 1);
    }
  }, [data, results.length, page]);

  const handleChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    if (term.length <= 0) {
      setSearchResult([]);
      return; // return early when search term is empty
    }
    const searchResults = results.filter((result) => {
      let { name, description, location } = result;
      let { city, country } = location;
      let searchArray = [name, description, city, country];
      return searchArray.some((item) => item && item.toLowerCase().includes(term));
    });
    setSearchResult(searchResults);
  };

  useEffect(() => {
    console.log(searchResult);
  }, [searchResult]);

  return (
    <div className="flex justify-center  items-start ">
      <div className="">
        <input onChange={handleChange} type="text" className="h-[45px] px-4 py-2 mr-2 rounded-l-md border-2 border-secondary focus:outline-none text-gray-700" placeholder="Search..." />
        <div className="Border border-primary bg-white text-tertiary overflow-auto max-h-[500px] rounded-l-md mr-2">
          {searchResult.length > 0 &&
            searchResult.slice(0, 30).map((result, index) => {
              console.log(result);
              return (
                <Link key={index} className="flex justify-between border-b border-primary p-2 hover:bg-gray-100" to={`venue/${result.id}`}>
                  {result.name}
                </Link>
              );
            })}
        </div>
      </div>
      <Link to={`/search/${searchTerm}`}>
        <CustomButton className="text-primary bg-orange border-secondary hover:bg-white hover:text-primary h-[45px]">Search</CustomButton>
      </Link>
    </div>
  );
};
export default Search;
