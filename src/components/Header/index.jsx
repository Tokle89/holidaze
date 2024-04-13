import Logo from "../Logo";
import Nav from "../Navigation";
import CustomButton from "../Button";

const Header = () => {
  return (
    <header className="  bg-primary p-3.5 ">
      <div className="max-w-7xl text-secondary flex  items-center justify-between m-auto">
        <div className="flex gap-20 items-baseline">
          <Logo />
          <Nav />
        </div>
        <div>
          <CustomButton className="bg-secondary rounded-none text-primary border-secondary rounded-l hover:text-secondary hover:bg-primary">Login</CustomButton>
          <CustomButton className="  bg-primary  rounded-none text-secondary  border-secondary rounded-r   hover:text-primary hover:bg-secondary">Register</CustomButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
