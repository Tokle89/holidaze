import { Carousel } from "@material-tailwind/react";
import { FaBed, FaParking } from "react-icons/fa";
import { IoPaw } from "react-icons/io5";
import { MdFoodBank } from "react-icons/md";
import { Tooltip } from "@material-tailwind/react";
import BookingCalendar from "../../Calendar";
import { useState, useEffect } from "react";
import CustomButton from "../../Button";

const DetailedCard = (data) => {
  console.log(data);
  const { media, name, location, maxGuests, meta, description, bookings, price } = data.data;
  const { wifi, parking, breakfast, pets } = meta;
  const [guests, setGuests] = useState(1);
  const [bookedDates, setBookedDates] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (bookedDates[0] && bookedDates[1]) {
      setTotalPrice(Math.ceil((bookedDates[1] - bookedDates[0]) / (1000 * 60 * 60 * 24)) * price);
    }
  }, [bookedDates, guests, price]);

  return (
    <div className="max-w-7xl m-auto ">
      <Carousel>
        {media.map((image) => (
          <img src={image.url} alt={image.alt} key={image.url} className="h-[430px]  w-full max-w-7xl object-fill" />
        ))}
      </Carousel>
      <div className=" flex flex-col  justify-center md:flex-row md:justify-between gap-10 ">
        <div className="space-y-4 mt-4  w-full md:w-4/5">
          <h1 className="text-tertiary">{name}</h1>
          <p className="text-gray-800">{location.address}</p>
          <p className="text-gray-800">
            {location.city}, {location.country}
          </p>
          <div className="flex items-center gap-3 text-gray-800">
            {" "}
            <FaBed className="text-2xl" /> <p>{maxGuests} Beds</p>
          </div>
          <div className="group mt-3 inline-flex flex-wrap items-center gap-3">
            {wifi && (
              <Tooltip content="Free wifi">
                <span className="cursor-pointer rounded-full border border-primary bg-tertiary p-3 text-white transition-colors  hover:bg-white hover:text-primary hover:!opacity-100 group-hover:opacity-70">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path
                      fillRule="evenodd"
                      d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.062 0 8.25 8.25 0 00-11.667 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.204 3.182a6 6 0 018.486 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0 3.75 3.75 0 00-5.304 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182a1.5 1.5 0 012.122 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0l-.53-.53a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </Tooltip>
            )}
            {breakfast && (
              <Tooltip content="Breakfast">
                <span className="cursor-pointer rounded-full border border-primary bg-tertiary p-3 text-white transition-colors hover:bg-white hover:text-primary hover:!opacity-100 group-hover:opacity-70">
                  <MdFoodBank className="h-5 w-5" />
                </span>
              </Tooltip>
            )}
            {parking && (
              <Tooltip content="Free parking">
                <span className="cursor-pointer rounded-full border border-primary bg-tertiary p-3 text-white transition-colors hover:bg-white hover:text-primary hover:!opacity-100 group-hover:opacity-70">
                  <FaParking className="h-5 w-5" />
                </span>
              </Tooltip>
            )}
            {pets && (
              <Tooltip content="Pets Allowed">
                <span className="cursor-pointer rounded-full border border-primary bg-tertiary p-3 text-white transition-colors hover:bg-white hover:text-primary hover:!opacity-100 group-hover:opacity-70">
                  <IoPaw className="h-5 w-5" />
                </span>
              </Tooltip>
            )}
          </div>
          <div className="bg-gray-200 p-3 space-y-4">
            <h2 className="text-2xl">Description:</h2>
            <p className="text-gray-800">{description}</p>
          </div>
        </div>
        <div className="space-y-5 w-full md:max-w-[400px] mt-5 shadow-md p-10">
          <h3 className="text-center mb-5 text-tertiary">Select your dates</h3>

          <div className="flex justify-center">
            <BookingCalendar
              bookings={bookings}
              onDateChange={(start, end) => {
                setBookedDates([start, end]);
              }}
            />
          </div>

          <p className="text-center">
            <span className="text-red">{price}kr</span> per night
          </p>
          <div className="relative h-10 w-full min-w-[200px]">
            <select
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-base font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              onChange={(number) => {
                setGuests(number.target.value);
              }}
            >
              {Array.from({ length: maxGuests }, (_, i) => i + 1).map((number) => (
                <option key={number} value={number}>
                  {number} guests
                </option>
              ))}
            </select>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Select number of guests
            </label>
          </div>

          <div className="space-y-5">
            <h3 className="text-center text-tertiary">Booked dates</h3>
            <div className="flex justify-between ">
              <div className="space-y-2">
                <p>From:</p>
                <div className="border p-4 border-secondary bg-secondary text-primary">
                  <p>{bookedDates.length > 0 ? bookedDates[0].toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }) : "Select a date"}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p>To:</p>
                <div className="border p-4 border-secondary bg-secondary text-primary">
                  <p>{bookedDates.length > 1 && bookedDates[1] ? bookedDates[1].toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }) : "Select a date"}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between pt-10 items-end">
              <p className="text-2xl">Total: {totalPrice}kr</p>
              <CustomButton className={"text-white bg-tertiary border-tertiary hover:text-tertiary hover:bg-white"}>Book </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedCard;
