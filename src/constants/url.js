const BaseUrl = "https://v2.api.noroff.dev/";
const holidazeUrl = `${BaseUrl}holidaze`;

const Urls = {
  profileUrl: `${holidazeUrl}/profiles`,
  venuesUrl: `${holidazeUrl}/venues`,
  bookingsUrl: `${holidazeUrl}/bookings`,
  registerUrl: `${BaseUrl}auth/register`,
  loginUrl: `${BaseUrl}auth/login`,
  apiKeyUrl: `${BaseUrl}auth/create-api-key`,
  profileQueryParamUrl: `?_venues=true&_bookings=true`,
  venueQueryParamUrl: `?_owner=true&_bookings=true`,
  bookingQueryParamUrl: `?_venue=true&_customer=true`,
};

export default Urls;
