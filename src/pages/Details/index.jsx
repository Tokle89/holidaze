import DetailedCard from "../../components/Cards/DetailedCard";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Urls from "../../constants/url";

const DetailedVenue = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useFetch(`${Urls.venuesUrl}/${id}${Urls.venueQueryParamUrl}`);

  return (
    <main className="my-10 px-5">
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}
      {data?.data && <DetailedCard data={data.data} />}
    </main>
  );
};

export default DetailedVenue;
