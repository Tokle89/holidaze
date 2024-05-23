import ProfileMenu from "../../UserProfileMenu";
import { NavLink, useLocation } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import handleActiveClass from "../../../utils/handleActiveClass";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../../AuthHandler";
import LoginButton from "../../AuthButtons/loginBtn";
import RegisterButton from "../../AuthButtons/RegisterBtn";
const MobileNav = ({ setShowMenu }) => {
  const location = useLocation();
  const { loggedIn } = useAuth();

  return (
    <div className="fixed top-0 right-0 z-100 overflow-auto flex  w-full max-w-[20rem] flex-col rounded bg-primary bg-clip-border p-4 text-white shadow-xl shadow-blue-gray-900/5 animate-fade-left animate-once animate-ease-in animate-duration-[100ms]">
      <div onClick={() => setShowMenu(false)} className="cursor-pointer flex justify-end">
        <IoClose className="text-5xl " />
      </div>

      <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal ">
        <div className=" mb-2">
          <h3 className="block ps-1 font-sans text-3xl antialiased font-semibold leading-snug tracking-normal ">Holidaze</h3>
        </div>
        <NavLink
          to="/"
          className={handleActiveClass(
            location,
            "/",
            "ps-1  flex items-center w-full rounded  py-3 leading-tight transition-all outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
          )}
        >
          Home
        </NavLink>
        <NavLink
          to="/#venues"
          className="ps-1 py-4 flex items-center w-full  rounded leading-tight transition-all  outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
        >
          Venues
        </NavLink>
        {loggedIn ? (
          <NavLink
            to="/venueForm"
            className={handleActiveClass(
              location,
              "/host",
              "ps-1 py-4 flex items-center w-full rounded  leading-tight transition-all  outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
            )}
          >
            Create venue
          </NavLink>
        ) : (
          <NavLink
            to="/host"
            className={handleActiveClass(
              location,
              "/host",
              "ps-1 py-4 flex items-center w-full rounded  leading-tight transition-all  outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
            )}
          >
            Become a host
          </NavLink>
        )}
        <NavLink to="/search" className={handleActiveClass(location, "/search", " flex  gap-4  py-4 ps-1 hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900")}>
          <FaSearch /> Search
        </NavLink>
      </nav>
      {loggedIn ? (
        <ProfileMenu />
      ) : (
        <div className="flex gap-7   pt-5">
          <LoginButton className={`border-white bg-tertiary text-white hover:text-tertiary hover:bg-white rounded-none rounded-l `} />
          <RegisterButton className={`border-white bg-white text-tertiary rounded-none rounded-r hover:bg-tertiary hover:text-white`} />
        </div>
      )}
    </div>
  );
};

export default MobileNav;
