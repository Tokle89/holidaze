import CustomButton from "../Button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardLink from "../Cards/VenueCard";
import BookingCard from "../Cards/ProfileBookingCard";

const UserBookingsAndVenues = ({ data, view, userName }) => {
  const { bookings, venues } = data;
  const [activeButton, setActiveButton] = useState(true);
  useEffect(() => {
    if (view === "bookings") {
      setActiveButton(true);
    } else if (view === "venues") {
      setActiveButton(false);
    }

    console.log(view, activeButton);
  }, [view]);
  return (
    <div className="  ">
      <div className="flex ">
        <Link to={`/profile/${userName}/bookings`} className="w-full">
          <CustomButton className={`border rounded-none text-white hover:bg-white hover:text-tertiary w-full ${activeButton ? `border-primary bg-white text-primary` : `bg-primary border-primary`}`}>Your bookings</CustomButton>
        </Link>
        <Link to={`/profile/${userName}/venues`} className="w-full">
          <CustomButton className={`border rounded-none text-white hover:bg-white hover:text-tertiary w-full ${!activeButton ? `border-primary bg-white text-primary` : `bg-primary border-primary`}`}>Your venues</CustomButton>
        </Link>
      </div>
      {(view === "bookings" || !view) && (
        <div>
          {bookings.length === 0 ? (
            <div className="text-center my-5 space-y-5">
              <h3 className="text-tertiary font-bold">You have not booked any venues</h3>
              <p>Find your dream holiday now</p>
              <Link to="/#venues" className="inline-block ">
                <CustomButton className="border border-tertiary bg-tertiary text-white hover:bg-white hover:text-tertiary ">Venues</CustomButton>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10 my-5 ">
              {bookings.map((booking) => (
                <BookingCard data={booking} key={booking.id} userName={userName} />
              ))}
            </div>
          )}
        </div>
      )}
      {view === "venues" && (
        <>
          {venues.length === 0 ? (
            <div className="text-center my-5 space-y-5">
              <h3 className="text-tertiary font-bold">You hav not created any venues yet</h3>
              <p>Create your first venue now</p>

              <CustomButton className="border border-tertiary bg-tertiary text-white hover:bg-white hover:text-tertiary ">Create</CustomButton>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 my-5">
              {" "}
              {venues.map((venue) => (
                <CardLink data={venue} key={venue.id} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserBookingsAndVenues;
