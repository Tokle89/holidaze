import useFetch from "../../hooks/useFetch";
import CardLink from "../Cards/VenueCard";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import UseUpdateSortParams from "../../hooks/UseUpdateSortParams";
import { useContext } from "react";
import MessageContext from "../../utils/MessageContexts";

/**
 *  A component that displays the venue section. It uses the UseUpdateSortParams hook to update the sorting parameters and Url based on the user's selection.
 * It uses the useFetch hook to fetch the venues from the server based on the sorting parameters.
 * It uses the MessageContext to display an error message if an error occurs during the fetching process.
 * @returns {JSX.Element}
 * @example
 * <VenueSection />
 */

const VenueSection = () => {
  const { isOpen, setIsOpen, dynamicHeader, sortingUrl, sortBy, sortOrder, page, limit } = UseUpdateSortParams();
  const { data, isLoading, isError } = useFetch(sortingUrl);
  const { showMessage } = useContext(MessageContext);

  return (
    <section id="venues" className="min-h-screen px-2.5 max-w-7xl mx-auto py-20">
      <h2 className="mb-5 text-tertiary font-mono">{dynamicHeader}</h2>
      <div className="relative mb-5">
        <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 bg-tertiary border border-tertiary text-white text-base rounded">
          Sort By:
        </button>
        {isOpen && (
          <ul className="absolute left-0 mt-1 w-48 bg-tertiary text-white rounded shadow-lg z-10 ">
            <li>
              <Link to={`/#venues?sort=created&sortOrder=desc&page=${page}&limit=${limit}`} className="py-2  block w-full px-4 hover:bg-primary cursor-pointer">
                Latest
              </Link>
            </li>
            <li>
              <Link to={`/#venues?sort=rating&sortOrder=desc&page=${page}&limit=${limit}`} className="py-2 block w-full px-4 hover:bg-primary cursor-pointer">
                Rating
              </Link>
            </li>
            <li>
              <Link to={`/#venues?sort=price&sortOrder=desc&page=${page}&limit=${limit}`} className="py-2 block w-full px-4 hover:bg-primary cursor-pointer">
                Price high-low
              </Link>
            </li>
            <li>
              <Link to={`/#venues?sort=price&sortOrder=asc&page=${page}&limit=${limit}`} className="py-2 block w-full px-4 hover:bg-primary cursor-pointer">
                Price low-high
              </Link>
            </li>
          </ul>
        )}
      </div>
      {isLoading && <Loader />}
      {isError && showMessage("error", "An error has occurred, please try again later.")}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">{data && data.data && data.data.filter(({ name }) => !name.toLowerCase().includes("test")).map((venue) => <CardLink key={venue.id} data={venue} />)}</div>
      {data && data.data && (
        <div className="flex justify-evenly mt-10">
          {page > 1 && (
            <Link to={`/#venues?sort=${sortBy}&sortOrder=${sortOrder}&page=${page > 1 ? page - 1 : 1}&limit=${limit}`} className="px-4 py-2 bg-tertiary border border-tertiary text-white text-base rounded">
              Prev
            </Link>
          )}
          <Link to={`/#venues?sort=${sortBy}&sortOrder=${sortOrder}&page=${page + 1}&limit=${limit}`} className={` ${page > 1 ? `` : `w-[300px] text-center `} px-4 py-2 bg-tertiary border border-tertiary text-white text-base rounded`}>
            Next
          </Link>
        </div>
      )}
    </section>
  );
};

export default VenueSection;
