import Urls from "../../constants/url";

const pathHandler = (pathname, id, userName, accessToken, apiKey) => {
  if (pathname.includes(`/profile/${userName}/bookings/${id}`)) {
    return {
      url: `${Urls.bookingsUrl}/${id}${Urls.bookingQueryParamUrl}`,
      options: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-Noroff-API-key": apiKey,
        },
      },
      pageState: "booking",
    };
  } else {
    return {
      url: `${Urls.venuesUrl}/${id}${Urls.venueQueryParamUrl}`,
      options: {},
    };
  }
};

export default pathHandler;
