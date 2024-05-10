import { useParams } from "react-router-dom";
import useLazyFetch from "../../hooks/useLazyFetch";
import Urls from "../../constants/url";
import { useMemo, useEffect, useState } from "react";
import ProfileCard from "../../components/Cards/ProfileCard";
import CustomButton from "../../components/Button";
import UserBookingsAndVenues from "../../components/UserBookingsAndVenues";
import DetailedCard from "../../components/Cards/DetailedCard";
import VenueForm from "../../components/VenueForm";

const ProfilePage = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const [url, setUrl] = useState();
  const params = useParams();
  const { userName, view, id } = params;
  const profileUrl = `${Urls.profileUrl}/${userName}${Urls.profileQueryParamUrl}`;
  const apiKey = import.meta.env.VITE_API_KEY;
  const { accessToken } = JSON.parse(localStorage.getItem("user"));
  const [triggerFetch, setTriggerFetch] = useState(false);
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

  useEffect(() => {
    fetchProfile(profileUrl, fetchOptions);
  }, [profileUrl, fetchOptions]);

  useEffect(() => {
    if (view === "bookings" && id) {
      console.log("view bookings");
      setUrl(`${Urls.bookingsUrl}/${id}${Urls.bookingQueryParamUrl}`);
    } else if (view === "venues" && id) {
      setUrl(`${Urls.venuesUrl}/${id}${Urls.venueQueryParamUrl}`);
      console.log("view venues");
    }
  }, [view, id]);

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
    <main className=" my-12 px-5">
      {toggleForm && <VenueForm setToggleForm={setToggleForm} />}
      {profileData && profileData.data && (
        <div>
          <div className="max-w-[350px] mx-auto">
            <ProfileCard data={profileData.data} />
            <div className="text-primary my-10">
              {!id && (
                <>
                  <h2 className="text-center mb-3">Create a new venue:</h2>
                  <CustomButton onClick={() => setToggleForm(true)} className={"border border-tertiary bg-tertiary text-white hover:bg-white hover:text-tertiary w-full"}>
                    Create
                  </CustomButton>
                </>
              )}
            </div>
          </div>
          {detailedData && detailedData.data && id ? <DetailedCard data={detailedData.data} setTriggerFetch={setTriggerFetch} /> : <UserBookingsAndVenues data={profileData.data} view={view} userName={userName} setTriggerFetch={setTriggerFetch} />}
        </div>
      )}
    </main>
  );
};

export default ProfilePage;
