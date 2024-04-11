import Logo from "../Logo";
import Nav from "../Navigation";
const Header = () => {
  return (
    <header className="  bg-blue p-3.5">
      <div className="max-w-7xl text-orange">
        <div className="flex gap-20 items-baseline">
          <Logo />
          <Nav />
        </div>
      </div>
    </header>
  );
};

export default Header;
