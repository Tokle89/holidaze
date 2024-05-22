import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import handleActiveClass from "../../../utils/handleActiveClass";
import { useAuth } from "../../AuthHandler";

const Nav = () => {
  const location = useLocation();
  const { loggedIn } = useAuth();

  return (
    <nav className="h-[30px] flex justify-around  ">
      <NavLink to="/" className={handleActiveClass(location, "/", " p-2 hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900")}>
        <p> Home</p>
      </NavLink>
      <NavLink to="/#venues" className="p-2 hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900">
        Venues
      </NavLink>

      {loggedIn ? (
        <NavLink to="/venueForm" className={handleActiveClass(location, "/venueForm", " p-2 hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900")}>
          Create a venue
        </NavLink>
      ) : (
        <NavLink to="/host" className={handleActiveClass(location, "/host", " p-2 hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900")}>
          Become a host
        </NavLink>
      )}
      <NavLink to="/search" className={handleActiveClass(location, "/search", " p-2 hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900")}>
        <FaSearch />
      </NavLink>
    </nav>
  );
};

export default Nav;
