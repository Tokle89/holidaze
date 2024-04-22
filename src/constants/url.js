const BaseUrl = "https://v2.api.noroff.dev/";
const holidazeUrl = `${BaseUrl}holidaze`;

const Urls = {
  profileUrl: `${holidazeUrl}/profiles`,
  venuesUrl: `${holidazeUrl}/venues`,
  queryParamUrl: `?_bookings=true&_owner=true`,
  bookingsUrl: `${holidazeUrl}/bookings`,
  registerUrl: `${BaseUrl}/auth/register`,
  loginUrl: `${BaseUrl}/auth/login`,
  apiKeyUrl: `${BaseUrl}/auth/create-api-key`,
};

export default Urls;
