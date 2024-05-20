const handleActiveClass = (location, path, defaultClasses) => {
  return location.pathname === path ? `${defaultClasses} border-b-2 border-white` : defaultClasses;
};

export default handleActiveClass;
