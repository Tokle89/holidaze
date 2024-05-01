import CustomButton from "../../Button";
const BookingAndVenueCard = ({
  data: {
    dateFrom,
    dateTo,
    guests,
    venue: { name, location, media },
  },
  onClick,
}) => {
  return (
    <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
      <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
        <img src={media ? media[0].url : `https://via.placeholder.com`} />
      </div>
      <div className="p-6">
        <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">{name}</h5>
        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
          {location.address}, {location.city}, {location.country}
        </p>
        <p className="font-sans  text-xl text-black mt-5 mb-2 font-semibold">Booked:</p>
        <div className="flex gap-10">
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">From: {new Date(dateFrom).toLocaleDateString()}</p>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">To: {new Date(dateTo).toLocaleDateString()}</p>
        </div>
        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">Guests: {guests}</p>
      </div>
      <div className="p-6 pt-0">
        <CustomButton onClick={onClick} className="w-full bg-tertiary text-white hover:bg-white hover:text-tertiary border-tertiary">
          View Venue
        </CustomButton>
      </div>
    </div>
  );
};

export default BookingAndVenueCard;
