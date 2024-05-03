import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Urls from "../../constants/url";
import DetailedCard from "../../components/Cards/DetailedCard";
import useLazyFetch from "../../hooks/useLazyFetch";
import { useEffect } from "react";

const DetailedVenue = () => {
  let params = useParams();
  const id = params.id;
  const { data, isLoading, isError } = useFetch(`${Urls.venuesUrl}/${id}${Urls.venueQueryParamUrl}`);
  const { response, isLoading: isBookingLoading, error: isBookingError, doFetch } = useLazyFetch();

  const handleBooking = (fetchOptions) => {
    console.log(fetchOptions);
    doFetch(Urls.bookingsUrl, fetchOptions);
  };

  useEffect(() => {
    console.log(response);
  }, [response]);

  return (
    <main className="my-10 px-5">
      {data.data && <DetailedCard data={data.data} onBookingClick={handleBooking} />},{isLoading && <p>loading</p>},{isError && <p>Error</p>}
    </main>
  );
};

export default DetailedVenue;
