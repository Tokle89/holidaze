import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Urls from "../../constants/url";
import DetailedCard from "../../components/Cards/DetailedCard";

const DetailedVenue = () => {
  let params = useParams();
  const id = params.id;
  const { data, isLoading, isError } = useFetch(`${Urls.venuesUrl}/${id}`);

  return <main className="my-10">{data.data && <DetailedCard data={data.data} />}</main>;
};

export default DetailedVenue;
