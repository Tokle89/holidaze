import Logo from "../Logo";
import Nav from "../Nav/Navigation";
import { MdMenu } from "react-icons/md";
import { useState, useEffect } from "react";
import MobileNav from "../Nav/MobileNav";
import { useAuth } from "../AuthHandler";
import LoginButton from "../AuthButtons/loginBtn";
import RegisterButton from "../AuthButtons/RegisterBtn";
import ProfileMenu from "../UserProfileMenu";
import UseWindowResizeEffect from "../../hooks/useWindowResize";
const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { loggedIn } = useAuth();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [loggedIn]);

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
