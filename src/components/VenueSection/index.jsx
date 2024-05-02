import useFetch from "../../hooks/useFetch";
import CardLink from "../Cards/Card";
import { useState, useEffect } from "react";
import Urls from "../../constants/url";
import { Link, useLocation } from "react-router-dom";

const VenueSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dynamicHeader, setDynamicHeader] = useState("Latest Venues");
  const location = useLocation();
  const [ratingUrl, setRatingUrl] = useState(Urls.venuesUrl + Urls.venueQueryParamUrl);

  const { data, isLoading, isError } = useFetch(ratingUrl);

  useEffect(() => {
    const hashParams = new URLSearchParams(location.hash.split("?")[1]);
    const sortBy = hashParams.get("sort") || "created";
    const sortOrder = hashParams.get("sortOrder") || "desc";
    const newRatingUrl = `${Urls.venuesUrl}/${Urls.venueQueryParamUrl}&sort=${sortBy}&sortOrder=${sortOrder}`;
    setRatingUrl(newRatingUrl);
    setIsOpen(false);
    const sortString = `${sortBy}, ${sortOrder}`;
    switch (sortString) {
      case "price, desc":
        setDynamicHeader("Expensive Venues");
        break;
      case "price, asc":
        setDynamicHeader("Cheapest Venues");
        break;
      case "rating, desc":
        setDynamicHeader("Popular venues");
        break;
      default:
        setDynamicHeader("Latest Venues");
    }
  }, [location]);

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
              <Link to={`/#venues?sort=created&sortOrder=desc`} className="py-2  block w-full px-4 hover:bg-primary cursor-pointer">
                Latest
              </Link>
            </li>
            <li>
              <Link to={`/#venues?sort=rating&sortOrder=desc`} className="py-2 block w-full px-4 hover:bg-primary cursor-pointer">
                Rating
              </Link>
            </li>
            <li>
              <Link to={`/#venues?sort=price&sortOrder=desc`} className="py-2 block w-full px-4 hover:bg-primary cursor-pointer">
                Price high-low
              </Link>
            </li>
            <li>
              <Link to={`/#venues?sort=price&sortOrder=asc`} className="py-2 block w-full px-4 hover:bg-primary cursor-pointer">
                Price low-high
              </Link>
            </li>
          </ul>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {isLoading && <p>Loading...</p>}
        {isError && <p>An error has occurred</p>}
        {data && data.data && data.data.filter(({ name }) => !name.toLowerCase().includes("test")).map((venue) => <CardLink key={venue.id} data={venue} />)}
      </div>
    </section>
  );
};

export default VenueSection;
