import CustomButton from "../Button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardLink from "../Cards/VenueCard";
import BookingCard from "../Cards/ProfileBookingCard";

/**
 *  A component that displays the user's bookings and venues.
 * It uses the useState hook to manage the active button state and and what container of cards to display.
 *
 * @param {Object} data - An object containing the user's bookings and venues.
 * @param {string} view - A string containing the view mode.
 * @param {string} userName - A string containing the user's name.
 * @returns {JSX.Element}
 * @example
 * <UserBookingsAndVenues data={data} view="bookings" userName="JohnDoe" />
 */

const UserBookingsAndVenues = ({ data, view, userName }) => {
  const { bookings, venues } = data;
  const [activeButton, setActiveButton] = useState(true);
  const { name } = JSON.parse(localStorage.getItem("user"));

  /**
   * A useEffect hook that listens for changes in the view state and updates the active button state and the container of cards accordingly.
   */
  useEffect(() => {
    if (view === "bookings") {
      setActiveButton(true);
    } else if (view === "venues") {
      setActiveButton(false);
    }
  }, [view]);
  return (
    <div>
      {name && name === userName ? (
        <div className="flex">
          <Link to={`/profile/${userName}/bookings`} className="w-full">
            <CustomButton className={` px-1 border rounded-none text-white hover:bg-primary hover:text-white w-full ${activeButton ? `bg-primary border-primary` : `border-primary bg-white text-primary`}`}>{name && name === userName ? `Your bookings` : `${userName}'s Venues`}</CustomButton>
          </Link>

          <Link to={`/profile/${userName}/venues`} className="w-full">
            <CustomButton className={` px-4 border rounded-none text-white hover:bg-primary hover:text-white w-full ${!activeButton ? `bg-primary border-primary` : `border-primary bg-white text-primary`}`}>Your venues</CustomButton>
          </Link>
        </div>
      ) : (
        <div className="border bg-primary py-5 text-white w-full">
          <p className="text-center text-xl font-medium">{userName}`s Venues:</p>
        </div>
      )}

      {(view === "bookings" || !view) && name && name === userName && (
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
      {(view === "venues" && name === userName) || name !== userName ? (
        <>
          {venues.length === 0 ? (
            <div className="text-center my-5 space-y-5">
              <h3 className="text-tertiary font-bold">You have not created any venues yet</h3>
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
      ) : null}
    </div>
  );
};

export default UserBookingsAndVenues;
