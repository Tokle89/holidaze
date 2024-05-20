import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Urls from "../constants/url";

const UseUpdateSortParams = () => {
  const [dynamicHeader, setDynamicHeader] = useState("Latest Venues");
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const hashParams = new URLSearchParams(location.hash.split("?")[1]);
  const sortBy = hashParams.get("sort") || "created";
  const sortOrder = hashParams.get("sortOrder") || "desc";
  const page = Number(hashParams.get("page")) || 1;
  const limit = hashParams.get("limit") || 18;
  const [sortingUrl, setSortingUrl] = useState(`${Urls.venuesUrl}/${Urls.venueQueryParamUrl}&sort=${sortBy}&sortOrder=${sortOrder}&page=${page}&limit=${limit}`);

  useEffect(() => {
    const newRatingUrl = `${Urls.venuesUrl}/${Urls.venueQueryParamUrl}&sort=${sortBy}&sortOrder=${sortOrder}&page=${page}&limit=${limit}`;
    setSortingUrl(newRatingUrl);
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

  return { isOpen, setIsOpen, dynamicHeader, sortingUrl, sortBy, sortOrder, page, limit };
};

export default UseUpdateSortParams;
