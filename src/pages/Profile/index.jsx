import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Urls from "../../constants/url";
import { useMemo } from "react";
import ProfileCard from "../../components/Cards/ProfileCard";
import CustomButton from "../../components/Button";
import UserBookingsAndVenues from "../../components/UserBookingsAndVenues";
const ProfilePage = () => {
  const params = useParams();
  const id = params.id;
  const url = `${Urls.profileUrl}/${id}${Urls.queryParamUrl}`;
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
  const { data, isLoading, isError } = useFetch(url, fetchOptions);
  console.log(data);
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
          <UserBookingsAndVenues data={data.data} />
        </div>
      )}
    </main>
  );
};

export default ProfilePage;
