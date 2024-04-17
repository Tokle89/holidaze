import Logo from "../Logo";
import Nav from "../Navigation";
import CustomButton from "../Button";
import { MdMenu } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import MobileNav from "../MobileNav";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header className=" z-50   relative inset-0 bg-primary p-3.5 ">
      <div className="   max-w-7xl text-secondary flex  items-center justify-between m-auto">
        <div className="flex gap-20 items-baseline">
          <Logo />
          <div className="hidden lg:block">
            <Nav className="hidden lg:block" />
          </div>
        </div>
        <div className="hidden lg:block">
          <CustomButton className="bg-secondary rounded-none text-primary border-secondary rounded-l hover:text-secondary hover:bg-primary">Login</CustomButton>
          <CustomButton className="  bg-primary  rounded-none text-secondary  border-secondary rounded-r   hover:text-primary hover:bg-secondary">Register</CustomButton>
        </div>
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
