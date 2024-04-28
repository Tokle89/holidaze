import CustomButton from "../Button";
import { useState } from "react";

const UserBookingsAndVenues = () => {
  const [activeButton, setActiveButton] = useState(true);
  return (
    <div>
      <div className="flex ">
        <CustomButton onClick={() => setActiveButton(true)} className={`border rounded-none text-white hover:bg-white hover:text-tertiary w-full ${activeButton ? `border-primary bg-white text-primary` : `bg-primary border-primary`}`}>
          Bookings
        </CustomButton>
        <CustomButton onClick={() => setActiveButton(false)} className={`border rounded-none text-white hover:bg-white hover:text-tertiary w-full ${!activeButton ? `border-primary bg-white text-primary` : `bg-primary border-primary`}`}>
          Venues
        </CustomButton>
      </div>
    </div>
  );
};

export default UserBookingsAndVenues;
