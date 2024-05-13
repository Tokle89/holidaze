const executeSubmit = (url, action, data, doFetch) => {
  const { accessToken } = JSON.parse(localStorage.getItem("user"));
  const apiKey = import.meta.env.VITE_API_KEY;
  const fetchOptions = {
    method: action,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "x-Noroff-API-key": apiKey,
    },
    body: JSON.stringify(data),
  };
  console.log("working");
  doFetch(url, fetchOptions);
};

export default executeSubmit;
