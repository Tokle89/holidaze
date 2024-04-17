import useFetch from "../hooks/useFetch";
import Urls from "../constants/url";

const filterVenues = () => {
  const venuesArr = [];
  let offset = 0;

  const { result, isLoading, isError } = useFetch(Urls.venuesUrl + `offset=${offset}`);

  const venues = result.data;

  console.log(venues);
};

export default filterVenues;
