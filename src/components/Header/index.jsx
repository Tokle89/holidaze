import Logo from "../Logo";
import Nav from "../Nav/Navigation";
import { MdMenu } from "react-icons/md";
import { useState, useEffect } from "react";
import MobileNav from "../Nav/MobileNav";
import useAuth from "../AuthHandler/useAuth";
import LoginButton from "../AuthButtons/loginBtn";
import RegisterButton from "../AuthButtons/RegisterBtn";
import ProfileMenu from "../UserProfileMenu";
import UseWindowResizeEffect from "../../hooks/useWindowResize";

/**
 * Header component that displays the Logo, Navigation, and User Profile Menu.
 * It uses the useAuth hook to access the loggedIn state and the user object.
 * The useAuth hook also provides the setUser function to update the user object, and toggles the  auth buttons and the user profile menu.
 * It uses the useState and useEffect hooks to manage the showMenu and isOpen states.
 * It uses the UseWindowResizeEffect hook to manage the showMenu and isOpen states based on the window size.
 * These states are used to toggle the mobile navigation menu and the user profile menu.
 * @returns {JSX.Element}
 */

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { loggedIn } = useAuth();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  /**
   * A useEffect hook that listens for changes in the local storage and updates the user object accordingly.
   */
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [loggedIn]);

  /**
   * A custom hook that manages the showMenu and isOpen states based on the  screen size.
   */
  UseWindowResizeEffect(setShowMenu, setIsOpen);
  return (
    <header className=" z-50   relative inset-0 bg-primary p-3.5 ">
      <div className="   max-w-7xl text-white flex  items-center justify-between m-auto">
        <div className="flex gap-10 items-baseline w-full">
          <Logo />
          <div className="hidden lg:block w-1/2 ">
            <Nav />
          </div>
        </div>
        {loggedIn ? (
          <div className="relative hidden lg:block ">
            {" "}
            <button onClick={() => setIsOpen(!isOpen)}>
              <img src={user?.avatar?.url} alt={user?.name} className="relative inline-block h-11 w-11 !rounded-full object-cover object-center border-2 border-white" />
            </button>
            {isOpen && <ProfileMenu setIsOpen={setIsOpen} className={`absolute bg-primary rounded text-white border-2 border-white  right-10 min-w-[200px]`} />}
          </div>
        ) : (
          <div className="hidden lg:block min-w-[256px]">
            <LoginButton className={`border-white bg-tertiary text-white hover:text-tertiary hover:bg-white rounded-none rounded-l `} />
            <RegisterButton className={`border-white bg-white text-tertiary rounded-none rounded-r hover:bg-tertiary hover:text-white`} />
          </div>
        )}
        <div className=" lg:hidden hamburger-icon relative cursor-pointer" onClick={() => setShowMenu((prev) => !prev)}>
          <MdMenu className="text-5xl" />
        </div>
      </div>
      {showMenu && <MobileNav setShowMenu={setShowMenu} />}
    </header>
  );
};

export default Header;
