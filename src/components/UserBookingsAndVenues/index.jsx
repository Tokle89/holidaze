import CustomButton from "../Button";
import { useState } from "react";
import BookingAndVenueCard from "../Cards/ProfileBookingAndVenueCard";
import { Link } from "react-router-dom";
import CardLink from "../Cards/Card";

const UserBookingsAndVenues = ({ data: { bookings, venues }, onVenueOrBookingClick }) => {
  const [activeButton, setActiveButton] = useState(true);

  return (
    <div>
      <div className="flex ">
        <CustomButton onClick={() => setActiveButton(true)} className={`border rounded-none text-white hover:bg-white hover:text-tertiary w-full ${activeButton ? `border-primary bg-white text-primary` : `bg-primary border-primary`}`}>
          Your Bookings
        </CustomButton>
        <CustomButton onClick={() => setActiveButton(false)} className={`border rounded-none text-white hover:bg-white hover:text-tertiary w-full ${!activeButton ? `border-primary bg-white text-primary` : `bg-primary border-primary`}`}>
          Your Venues
        </CustomButton>
      </div>
      {activeButton ? (
        <div>
          {bookings.length < 0 ? (
            <div className="text-center my-5 space-y-5">
              <h3 className="text-tertiary font-bold">You have not booked any venues</h3>
              <p>Find your dream holyday now</p>
              <Link to="/#venues" className="inline-block ">
                <CustomButton className="border border-tertiary bg-tertiary text-white hover:bg-white hover:text-tertiary ">Venues</CustomButton>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 my-5 ">
              {" "}
              {bookings.map((booking) => (
                <BookingAndVenueCard
                  data={booking}
                  key={booking.id}
                  onClick={() => {
                    onVenueOrBookingClick(booking.id, "booking");
                  }}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {venues.length < 0 ? (
            <div className="text-center my-5 space-y-5">
              <h3 className="text-tertiary font-bold">You hav not created any venues yet</h3>
              <p>Create your first venue now</p>

              <CustomButton className="border border-tertiary bg-tertiary text-white hover:bg-white hover:text-tertiary ">Create</CustomButton>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5">
              {" "}
              {venues.map((venue) => (
                <CardLink data={venue} key={venue.id} onClick={() => onVenueOrBookingClick(venue.id, "venue")} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserBookingsAndVenues;
