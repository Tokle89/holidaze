/**
 * A function that executes the submission of a form by sending a request to the server. It takes the URL, action, data, and doFetch function as arguments and handles the body and Url parameters for the fetch request.
 * @param {String} url
 * @param {String} action
 * @param {Object} data
 * @param {Function} doFetch
 * @returns {void}
 * @example
 * executeSubmit("https://example.com/api", "POST", {name: "John Doe"}, doFetch)
 */

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
  doFetch(url, fetchOptions);
};

export default executeSubmit;
