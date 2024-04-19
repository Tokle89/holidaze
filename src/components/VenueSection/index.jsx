import useFetch from "../../hooks/useFetch";
import CardLink from "../Card";
import { useState } from "react";
import Urls from "../../constants/url";

const VenueSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState("created");
  const [dynamicHeader, setDynamicHeader] = useState("Latest venues");
  const [order, setOrder] = useState("desc");
  const RatingUrl = `${Urls.venuesUrl}?&sort=${sortBy}&sortOrder=${order}`;
  const { data, isLoading, isError } = useFetch(RatingUrl);

  let content;

  const sortHandler = (urlValue, headerValue, order) => {
    setDynamicHeader(headerValue);
    setSortBy(urlValue);
    setOrder(order);
    setIsOpen(false);
  };

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (data.data) {
    let venues = data.data;
    content = venues.filter(({ name }) => !name.toLowerCase().includes("test")).map((venue) => <CardLink key={venue.id} data={venue} />);
  } else {
    content = <p>{isError ? "An error has occurred" : "No data"}</p>;
  }

  return (
    <section id="venueSection" className=" px-2.5  max-w-7xl mx-auto my-20 ">
      <h2 className=" mb-5 text-tertiary  font-mono ">{dynamicHeader}</h2>
      <div className="relative mb-5">
        <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 bg-tertiary border border-tertiary text-white  rounded ">
          Sort By:
        </button>
        {isOpen && (
          <div className="absolute left-0 mt-1 w-48 bg-tertiary text-white rounded shadow-lg z-10">
            <ul>
              <li onClick={() => sortHandler("created", "Latest Venues", "desc")} className="py-2 px-4 hover:bg-primary cursor-pointer">
                Latest
              </li>
              <li onClick={() => sortHandler("rating", "Popular venues", "desc")} className="py-2 px-4 hover:bg-primary cursor-pointer">
                Rating
              </li>
              <li onClick={() => sortHandler("price", " Expensive Venues", "desc")} className="py-2 px-4 hover:bg-primary cursor-pointer">
                Price high-low
              </li>
              <li onClick={() => sortHandler("price", " Cheapest Venues", "asc")} className="py-2 px-4 hover:bg-primary cursor-pointer">
                Price low-high
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 "> {content}</div>
    </section>
  );
};

export default VenueSection;
