import Logo from "../Logo";
import Nav from "../Navigation";
import { MdMenu } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import MobileNav from "../MobileNav";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthHandler";
import LoginButton from "../AuthButtons/loginBtn";
import RegisterButton from "../AuthButtons/RegisterBtn";
import { IoIosSettings } from "react-icons/io";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate();
  const { loggedIn, setLoggedIn, setShowProfileForm } = useAuth();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [loggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setLoggedIn(false);
    navigate("/");
  };
  return (
    <header className=" z-50   relative inset-0 bg-primary p-3.5 ">
      <div className="   max-w-7xl text-secondary flex  items-center justify-between m-auto">
        <div className="flex gap-20 items-baseline">
          <Logo />
          <div className="hidden lg:block">
            <Nav className="hidden lg:block" />
          </div>
        </div>
        {loggedIn ? (
          <div className="relative hidden lg:block ">
            {" "}
            <button onClick={() => setIsOpen(!isOpen)}>
              <img src={user?.avatar?.url} alt={user?.name} className="relative inline-block h-11 w-11 !rounded-full object-cover object-center border-2 border-white" />
            </button>
            {isOpen && (
              <ul className="absolute bg-primary rounded text-white border-2 border-white  right-10 min-w-[200px]">
                <Link
                  to={`/profile/${user?.name}`}
                  onClick={() => setIsOpen(false)}
                  className="py-5 flex items-center w-full p-3 leading-tight transition-all rounded outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                >
                  <div className="grid mr-4 place-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  Profile
                </Link>
                <div
                  role="button"
                  onClick={() => {
                    setShowProfileForm(true);
                    setIsOpen(false);
                  }}
                  className="py-5 flex items-center w-full p-3 leading-tight transition-all rounded outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                >
                  <div className="grid mr-4 place-items-center">
                    <IoIosSettings className="w-5 h-5" />
                  </div>
                  Edit Profile
                </div>
                <div
                  role="button"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="py-5 flex items-center w-full p-3 leading-tight transition-all rounded outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                >
                  <div className="grid mr-4 place-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
                      <path
                        fillRule="evenodd"
                        d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  Log Out
                </div>
              </ul>
            )}
          </div>
        ) : (
          <div className="hidden lg:block">
            <LoginButton className={`border-secondary bg-secondary text-primary hover:text-secondary hover:bg-primary rounded-none rounded-l `} />
            <RegisterButton className={`border-secondary bg-primary text-secondary rounded-none rounded-r hover:bg-secondary hover:text-primary`} />
          </div>
        )}
        <div className=" lg:hidden hamburger-icon relative cursor-pointer" onClick={() => setShowMenu((prev) => !prev)}>
          <div className={`hamburger ${showMenu ? "hidden" : "block"}`}>
            <MdMenu className="text-5xl" />
          </div>
          <div className={`x-icon ${showMenu ? "block " : "hidden"}`}>
            {/* Your X icon SVG or JSX */}
            <IoClose className="text-5xl" />
          </div>
        </div>
      </div>
      {showMenu && <MobileNav />}
    </header>
  );
};

export default Header;
