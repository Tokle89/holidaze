import Search from "../../components/Search";
import { useParams } from "react-router-dom";
import CardLink from "../../components/Cards/VenueCard";
import useSearch from "../../hooks/UseSearch";
import RenderPageHeadInfo from "../../hooks/UsePageHeadHandler";

/**
 *  The Search page component that displays the Search component and the CardLink component. It uses the useParams hook to access the search query, the useSearch hook to fetch the search results, and the RenderPageHeadInfo hook to set the dynamic header based on the search query.
 * @returns {JSX.Element}
 * @example
 * <SearchPage />
 */
const SearchPage = () => {
  const { id } = useParams();
  const { searchResults, isLoading, error } = useSearch(id);
  RenderPageHeadInfo("Search", "Search for your dream holiday");
  return (
    <main className="my-10 max-w-7xl mx-auto">
      <div className="space-y-5 mb-10">
        <h1 className="text-center text-2xl md:text-4xl text-primary">Search for your dream holiday</h1>
        <Search />
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>An error has occurred</p>}
      {searchResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-5">
          {searchResults.map((result, index) => (
            <CardLink key={index} data={result} />
          ))}
        </div>
      )}
      {searchResults.length === 0 && !isLoading && !error && id && <p className="text-center text-red-400 font-bold mt-10">No matching results found</p>}
    </main>
  );
};

export default SearchPage;
