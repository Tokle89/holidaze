import { useEffect } from "react";

/**
 * A custom hook that renders the page title and description.
 * @param {String} title  The title of the page
 * @param {String} description  The description of the page
 * @returns {void}
 * @example
 * RenderPageHeadInfo("Home", "This is the home page")
 */

const RenderPageHeadInfo = (title, description) => {
  useEffect(() => {
    document.title = `Holidaze | ${title}`;
    document.querySelector('meta[name="description"]').setAttribute("content", description);
  }, [title, description]);
};

export default RenderPageHeadInfo;
