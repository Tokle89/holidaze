import Search from "../../components/Search";
import { useParams } from "react-router-dom";
import CardLink from "../../components/Cards/Card";
import useSearch from "../../hooks/UseSearch";

const SearchPage = () => {
  const { id } = useParams();
  const { searchResults, isLoading, error } = useSearch(id);
  return (
    <main className="my-10 max-w-7xl mx-auto">
      <div className="space-y-5">
        <h1 className="text-center text-primary">Search for your dream holiday</h1>
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
      {searchResults.length === 0 && !isLoading && !error && <p className="text-center text-red-400 font-bold mt-10">No matching results found</p>}
    </main>
  );
};

export default SearchPage;
