import CustomButton from "../Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import useSearch from "../../hooks/UseSearch";

/**
 * Search component that allows users to search for venues.
 * It uses the useSearch hook to fetch the search results from the server.
 * It uses the useState hook to manage the search term state.
 * It uses the Link component from react-router-dom to navigate to the search results page.
 * @returns {JSX.Element}
 * @example
 * <Search />
 */

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchResults, error, isLoading } = useSearch(searchTerm);

  /**
   *  A function that handles the change event of the search input field.
   * @param {Object} event  The event object
   */
  const handleChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };

  /**
   * A function that handles the search event by resetting the search term, so when the user is taken to the search results page, the search term is cleared.
   */
  const handleSearch = () => {
    setSearchTerm("");
  };
  return (
    <div className="flex justify-center gap-2 md:gap-5  items-start relative">
      <div>
        <input onChange={handleChange} type="text" className="h-[45px] w-full px-4 py-2 rounded-l-md border-2 border-tertiary focus:outline-none text-gray-700" placeholder="Search..." />
        <div className="Border border-primary bg-white text-tertiary overflow-auto max-h-[500px] rounded-l-md mr-2 absolute max-w-[248px]  w-full z-[100]">
          {searchResults.length > 0 &&
            (isLoading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              searchResults.slice(0, 30).map((result, index) => (
                <Link key={index} className="flex justify-between border-b border-primary p-2 hover:bg-gray-100" to={`/venue/${result.id}`}>
                  {result.name}
                </Link>
              ))
            ))}
        </div>
      </div>
      <Link onClick={handleSearch} to={`/search/${searchTerm}`}>
        <CustomButton className="text-white bg-tertiary border-white hover:bg-white hover:text-tertiary h-[45px]">Search</CustomButton>
      </Link>
    </div>
  );
};
export default Search;
