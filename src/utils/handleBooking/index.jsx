const handleBooking = (url, method, body, setAction, doFetch, accessToken, apiKey) => {
  setAction(method);
  const fetchOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "x-Noroff-API-key": apiKey,
    },
    body: body,
  };
  doFetch(url, fetchOptions);
};

export default handleBooking;
