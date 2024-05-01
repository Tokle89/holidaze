import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Urls from "../../constants/url";
import { useMemo } from "react";
import ProfileCard from "../../components/Cards/ProfileCard";
import CustomButton from "../../components/Button";
import UserBookingsAndVenues from "../../components/UserBookingsAndVenues";
import { useState } from "react";
import useLazyFetch from "../../hooks/useLazyFetch";
import DetailedCard from "../../components/Cards/DetailedCard";
const ProfilePage = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedTypeSet, setSelectedTypeSet] = useState(false);
  const params = useParams();
  const id = params.id;
  const profileUrl = `${Urls.profileUrl}/${id}${Urls.profileQueryParamUrl}`;
  const apiKey = import.meta.env.VITE_API_KEY;
  const { accessToken } = JSON.parse(localStorage.getItem("user"));
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

  const { data, isLoading: profileLoading, isError: profileError } = useFetch(profileUrl, fetchOptions);
  const { response, IsLoading: venueLoading, IsError: venueError, doFetch } = useLazyFetch();

  const handleVenueAndBookingClick = (id, type) => {
    let url;
    if (type === "booking") {
      url = `${Urls.bookingsUrl}/${id}${Urls.bookingQueryParamUrl}`;
    } else if (type === "venue") {
      url = `${Urls.venuesUrl}/${id}${Urls.venueQueryParamUrl}`;
    }

    if (url) {
      setSelectedType(type);
      setSelectedTypeSet(true);
      doFetch(url, fetchOptions);
      console.log(response);
    }
  };

  // ...

  return (
    <main className=" my-12 px-5">
      {data.data && (
        <div>
          <div className="max-w-[350px] mx-auto">
            <ProfileCard data={data.data} />
            <div className="text-primary my-10">
              <h2 className="text-center mb-3">Create a new venue:</h2>
              <CustomButton className={"border border-tertiary bg-tertiary text-white hover:bg-white hover:text-tertiary w-full"}> Create</CustomButton>
            </div>
          </div>
          {selectedType === null ? (
            <UserBookingsAndVenues data={data.data} onVenueOrBookingClick={handleVenueAndBookingClick} />
          ) : venueLoading ? (
            <div>Loading...</div>
          ) : venueError ? (
            <div>Error: {venueError.message}</div>
          ) : (
            selectedTypeSet && response && <DetailedCard data={response.data} type={selectedType} />
            // <UserBookingsAndVenues data={data.data} onVenueOrBookingClick={handleVenueAndBookingClick} />
          )}
        </div>
      )}
    </main>
  );
};

export default ProfilePage;
