import DetailedCard from "../../components/Cards/DetailedCard";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Urls from "../../constants/url";
import Loader from "../../components/Loader";
import MessageContext from "../../utils/MessageContexts";
import { useContext } from "react";
import RenderPageHeadInfo from "../../hooks/UsePageHeadHandler";

/**
 *  The Detailed page component that fetches the venue data based on the venue id. It uses the useParams hook to access the venue id, the useFetch hook to fetch the venue data, and the MessageContext to display a message if an error occurs.
 * @returns {JSX.Element}
 * @example
 * <DetailedVenue />
 */
const DetailedVenue = () => {
  const { id } = useParams();
  const { showMessage } = useContext(MessageContext);
  const { data, isLoading, isError } = useFetch(`${Urls.venuesUrl}/${id}${Urls.venueQueryParamUrl}`);
  RenderPageHeadInfo("Details", "View your venue or event details here");

  return (
    <main className="my-10 px-5">
      {isLoading && <Loader />}
      {isError && showMessage("error", "An error has occurred, please try again later.")}
      {data?.data && <DetailedCard data={data.data} />}
    </main>
  );
};

export default DetailedVenue;
