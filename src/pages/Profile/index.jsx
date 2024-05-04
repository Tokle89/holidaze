import { useParams, Outlet } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import useLazyFetch from "../../hooks/useLazyFetch";
import Urls from "../../constants/url";
import { useMemo, useEffect, useState } from "react";
import ProfileCard from "../../components/Cards/ProfileCard";
import CustomButton from "../../components/Button";
import { DataContext } from "../../utils/DataContexts";

const ProfilePage = () => {
  const params = useParams();
  const { userName, view, id } = params;
  const profileUrl = `${Urls.profileUrl}/${userName}${Urls.profileQueryParamUrl}`;
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

  const [url, setUrl] = useState();

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
      doFetch(url, fetchOptions);
    }
  }, [url]);

  console.log(data);
  return (
    <main className=" my-12 px-5">
      {data && data.data && (
        <div>
          <div className="max-w-[350px] mx-auto">
            <ProfileCard data={data.data} />
            <div className="text-primary my-10">
              <h2 className="text-center mb-3">Create a new venue:</h2>
              <CustomButton className={"border border-tertiary bg-tertiary text-white hover:bg-white hover:text-tertiary w-full"}> Create</CustomButton>
            </div>
          </div>
          <DataContext.Provider value={{ data: data.data, response, view, userName, venueLoading, venueError }}>{(!id || (id && response)) && <Outlet />}</DataContext.Provider>
        </div>
      )}
    </main>
  );
};

export default ProfilePage;
