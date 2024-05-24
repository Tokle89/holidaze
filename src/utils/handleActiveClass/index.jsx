/**
 * A utility function creates an active class for the NavLinks  based on the current path.
 * @param {Object} location - The location object from the useLocation hook.
 * @param {String} path  - The path to compare with the location.pathname.
 * @param {String} defaultClasses  - The default classes to return if the paths do or do not match.
 * @returns {String} - The classes to apply to the element based on the active path.
 * @example
 * handleActiveClass(location, "/home", "text-gray-500");
 */

const handleActiveClass = (location, path, defaultClasses) => {
  return location.pathname === path ? `${defaultClasses} border-b-2 border-white` : defaultClasses;
};

export default handleActiveClass;
