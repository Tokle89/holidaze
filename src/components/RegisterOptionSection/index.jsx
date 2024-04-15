import { Link } from "react-router-dom";
import CustomButton from "../Button";

const RegisterOptionSection = () => {
  return (
    <div className="flex text-primary m-auto max-w-7xl justify-between my-14">
      <div className="flex flex-col items-center  max-w-md">
        <p className="mb-7 text-xl ">Create your customer account now, and begin your next adventure</p>
        <Link to="/register">
          <CustomButton className="text-white bg-tertiary border-tertiary  hover:bg-white hover:text-tertiary">Register</CustomButton>
        </Link>
      </div>
      <p className=" font-bold text-xl ">Or</p>
      <div className="flex flex-col items-center  max-w-md">
        <p className="mb-7 text-xl">Become a host today and unlock a world of opportunities</p>
        <Link to="/host">
          <CustomButton className="text-white bg-tertiary border-tertiary  hover:bg-white hover:text-tertiary">Sign up</CustomButton>
        </Link>
      </div>
    </div>
  );
};

export default RegisterOptionSection;
