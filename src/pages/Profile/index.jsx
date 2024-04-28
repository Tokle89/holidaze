import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Urls from "../../constants/url";
const ProfilePage = () => {
  const params = useParams();
  const id = params.id;
  const url = `${Urls.profileUrl}/${id}`;
  const apiKey = process.env.REACT_APP_API_KEY;

  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "x-Noroff-API-key": apiKey,
    },
  };
  const { data, isLoading, isError } = useFetch(url, fetchOptions);
  console.log(data);

  console.log(id);
  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  );
};

export default ProfilePage;
