import Logo from "../Logo";
import Nav from "../Nav/Navigation";
import { MdMenu } from "react-icons/md";
import { useState, useEffect } from "react";
import MobileNav from "../Nav/MobileNav";
import { useAuth } from "../AuthHandler";
import LoginButton from "../AuthButtons/loginBtn";
import RegisterButton from "../AuthButtons/RegisterBtn";
import ProfileMenu from "../UserProfileMenu";
const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { loggedIn } = useAuth();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [loggedIn]);

  return (
    <header className=" z-50   relative inset-0 bg-primary p-3.5 ">
      <div className="   max-w-7xl text-white flex  items-center justify-between m-auto">
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
            {isOpen && <ProfileMenu setIsOpen={setIsOpen} className={`absolute bg-primary rounded text-white border-2 border-white  right-10 min-w-[200px]`} />}
          </div>
        ) : (
          <div className="hidden lg:block">
            <LoginButton className={`border-secondary bg-secondary text-primary hover:text-secondary hover:bg-primary rounded-none rounded-l `} />
            <RegisterButton className={`border-secondary bg-primary text-secondary rounded-none rounded-r hover:bg-secondary hover:text-primary`} />
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
