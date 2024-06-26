import { useParams, Link } from "react-router-dom";
import useLazyFetch from "../../hooks/useLazyFetch";
import Urls from "../../constants/url";
import { useMemo, useEffect, useState } from "react";
import ProfileCard from "../../components/Cards/ProfileCard";
import CustomButton from "../../components/Button";
import UserBookingsAndVenues from "../../components/UserBookingsAndVenues";
import DetailedCard from "../../components/Cards/DetailedCard";
import { useContext } from "react";
import MessageContext from "../../utils/MessageContexts";
import Loader from "../../components/Loader";
import RenderPageHeadInfo from "../../hooks/UsePageHeadHandler";
/**
 *  The Profile page component that displays the user's profile information and the users bookings/venues.
 * It uses the useParams hook to access the username from the URL. It uses the useLazyFetch hook to fetch the user's profile data and the detailed data for the bookings/venues.
 * @returns {JSX.Element}
 */
const ProfilePage = () => {
  const [url, setUrl] = useState();
  const params = useParams();
  const { userName, view, id } = params;
  const profileUrl = `${Urls.profileUrl}/${userName}${Urls.profileQueryParamUrl}`;
  const apiKey = import.meta.env.VITE_API_KEY;
  const { accessToken, name } = JSON.parse(localStorage.getItem("user"));
  const [triggerFetch, setTriggerFetch] = useState(false);
  const { showMessage } = useContext(MessageContext);
  RenderPageHeadInfo("Profile", "View your profile here");

  /**
   * A useMemo hook that returns the fetchOptions object containing the method, headers, and authorization token.
   */
  const fetchOptions = useMemo(
    () => ({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "x-Noroff-API-key": apiKey,
      },
    }),
    [accessToken, apiKey]
  );

  const { response: profileData, isLoading: profileLoading, isError: profileError, doFetch: fetchProfile } = useLazyFetch();
  const { response: detailedData, isLoading: detailedLoading, isError: detailedError, doFetch: fetchDetailed } = useLazyFetch();

  /**
   * A useEffect hook that fetches the user's profile data when the component mounts or when the profileUrl or fetchOptions change.
   */
  useEffect(() => {
    fetchProfile(profileUrl, fetchOptions);
  }, [profileUrl, fetchOptions]);

  /**
   * A useEffect hook that sets the URL based on the view and id parameters from the URL.
   */
  useEffect(() => {
    if (view === "bookings" && id) {
      setUrl(`${Urls.bookingsUrl}/${id}${Urls.bookingQueryParamUrl}`);
    } else if (view === "venues" && id) {
      setUrl(`${Urls.venuesUrl}/${id}${Urls.venueQueryParamUrl}`);
    }
  }, [view, id]);
  /**
   * A useEffect hook that fetches the detailed data when the URL or triggerFetch state changes.
   */
  useEffect(() => {
    if (url) {
      if (id) {
        fetchDetailed(url, fetchOptions);
      } else {
        fetchProfile(profileUrl, fetchOptions);
      }
    }
  }, [url, triggerFetch]);
  return (
    <main className=" my-12 px-5 w-full max-w-7xl mx-auto">
      {profileLoading && <Loader />}
      {profileError && showMessage("error", "An error has occurred, please try again later.")}
      {profileData && profileData.data && (
        <div>
          <div className="max-w-[350px] mx-auto">
            <ProfileCard data={profileData.data} />
            <div className="text-primary my-10">
              {name && name === userName && (
                <>
                  <h2 className="text-center mb-3">Create a new venue:</h2>
                  <Link to="/venueForm">
                    <CustomButton className={"border border-tertiary bg-tertiary text-white hover:bg-white hover:text-tertiary w-full"}>Create</CustomButton>
                  </Link>
                </>
              )}
            </div>
          </div>
          {detailedLoading && <Loader />}
          {detailedError && showMessage("error", "An error has occurred, please try again later.")}
          {detailedData && detailedData.data && id ? <DetailedCard data={detailedData.data} setTriggerFetch={setTriggerFetch} /> : <UserBookingsAndVenues data={profileData.data} view={view} userName={userName} setTriggerFetch={setTriggerFetch} />}
        </div>
      )}
    </main>
  );
};

export default ProfilePage;
