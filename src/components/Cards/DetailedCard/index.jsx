import { Carousel } from "@material-tailwind/react";
import { FaBed, FaParking } from "react-icons/fa";
import { IoPaw } from "react-icons/io5";
import { MdFoodBank } from "react-icons/md";
import { Tooltip } from "@material-tailwind/react";
import BookingCalendar from "../../Calendar";
import { useState, useEffect } from "react";
import CustomButton from "../../Button";
import ProfileCard from "../ProfileCard";
import { useAuth } from "../../AuthHandler";
import LoginButton from "../../AuthButtons/loginBtn";
import { useLocation, useParams, Link } from "react-router-dom";
import Urls from "../../../constants/url";
import useLazyFetch from "../../../hooks/useLazyFetch";
import useFetch from "../../../hooks/useFetch";
import pathHandler from "../../../utils/pathHandler";
import useResponseHandler from "../../../hooks/useResponseHandler";
import UsePriceCalculator from "../../../hooks/usePriceCalculator";
import handleBooking from "../../../utils/handleBooking";

const DetailedCard = () => {
  const { pathname } = useLocation();
  const [guests, setGuests] = useState(1);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [url, setUrl] = useState(null);
  const [options, setOptions] = useState(null);
  const [pageState, setPageState] = useState(null);
  const [action, setAction] = useState(null);
  const [bookingChange, setBookingChange] = useState(false);
  const { loggedIn } = useAuth();
  const { accessToken, name: userName } = JSON.parse(localStorage.getItem("user"));
  const apiKey = import.meta.env.VITE_API_KEY;

  let { id } = useParams();

  useEffect(() => {
    const { url, options, pageState } = pathHandler(pathname, id, userName, accessToken, apiKey);
    setPageState(pageState);
    setUrl(url);
    setOptions(options);
  }, [pathname, id]);

  const { data = {}, isLoading, isError } = useFetch(url, options);
  const { response, isLoading: loading, isError: error, doFetch } = useLazyFetch();
  const { media, name, location, maxGuests, meta, description, bookings, price, owner } = data.data?.venue || data.data || {};

  const { wifi, parking, breakfast, pets } = meta || {};
  useEffect(() => {
    if (pageState === "booking" && data.data) {
      setDateFrom(new Date(data.data.dateFrom));
      setDateTo(new Date(data.data.dateTo));
      setGuests(data.data.guests);
    }
  }, [data, bookings]);

  const totalPrice = UsePriceCalculator(price, dateFrom, dateTo);

  const handleBookingClick = (url, method, body) => {
    handleBooking(url, method, body, setAction, doFetch, accessToken, apiKey);
    console.log(method);
    setTimeout(() => {
      if (method === "PUT") {
        setBookingChange((prevState) => prevState + 1);
        console.log("working");
      }
    }, 1500);
  };

  useResponseHandler(response, action, id);

  return (
    <>
      {isLoading && <p>loading</p>}

      {data && data.data && (
        <div className="max-w-7xl m-auto ">
          <Carousel>
            {media.map((image) => (
              <img src={image.url} alt={image.alt} key={image.url} className="h-[430px]  w-full max-w-7xl object-fill" />
            ))}
          </Carousel>
          <div className=" flex flex-col  justify-center md:flex-row md:justify-between gap-10 ">
            <div className="space-y-4 mt-4  w-full md:w-4/5">
              {pageState === "booking" && (
                <div className="border-2 border-tertiary p-5 space-y-3">
                  <h3 className="text-tertiary text-xl">
                    Booking ID: <span className="text-gray-700"> {data.data.id}</span>
                  </h3>
                  <p className="text-gray-800">Booked by: {data.data.customer.email}</p>
                  <p className="text-gray-800">Booked on: {new Date(data.data.created).toLocaleDateString()}</p>
                  <div className=" w-full border-tertiary border"></div>
                  <div className="text-gray-800 space-y-3">
                    <p className="text-tertiary text-xl ">Booking details:</p>
                    <p>{name}</p>
                    <p className="text-gray-800">
                      {location.address}, {location.city}, {location.country}
                    </p>
                    <div className="flex gap-10">
                      <p>From: {new Date(data.data.dateFrom).toLocaleDateString()}</p>
                      <p>To: {new Date(data.data.dateTo).toLocaleDateString()}</p>
                    </div>
                    <p>Guests: {data.data.guests}</p>
                    <p>Total: {price}kr</p>
                  </div>
                  <div className=" w-full border-tertiary border"></div>
                  <div className="space-y-3 text-gray-800">
                    <p className="text-tertiary text-xl">Update booking:</p>
                    <p>To update your booking just change the dates using the calendar, update the number of guests and press the update button</p>
                  </div>
                  <div className=" w-full border-tertiary border"></div>
                  <div className="space-y-3 text-gray-800 ">
                    <p className="text-tertiary text-xl">Cancel booking:</p>
                    <p>To cancel your booking just press the red button below</p>
                    <CustomButton className={`bg-red-800 min-w-[250px]`} onClick={() => handleBookingClick(`${Urls.bookingsUrl}/${id}`, "DELETE")}>
                      Cancel booking
                    </CustomButton>
                  </div>
                </div>
              )}
              <h1 className="text-tertiary">{name}</h1>
              {location.address && <p className="text-gray-800">{location.address}</p>}
              <p className="text-gray-800">
                {location.city && `${location.city},`} {location.country && location.country}
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
              <h2 className="text-2xl mt-10">Hosted by:</h2>
              <Link to={`/profile/${owner.name}`} className="shadow-md hover:shadow-lg p-5 inline-block">
                <ProfileCard data={owner} />
              </Link>
            </div>
            <div className="space-y-5 w-full md:max-w-[400px] mt-5 shadow-md p-10">
              <h3 className="text-center mb-5 text-tertiary">Select your dates</h3>

              <div className="flex justify-center">
                <BookingCalendar
                  bookings={bookings || []}
                  selectedDates={[dateFrom, dateTo]}
                  onDateChange={(start, end) => {
                    setDateFrom(start);
                    setDateTo(end);
                  }}
                />
              </div>

              <p className="text-center">
                <span className="text-red">{price}kr</span> per night
              </p>
              <div className="relative h-10 w-full min-w-[200px]">
                <select
                  value={guests ? guests : 1}
                  className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-base font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  onChange={(number) => {
                    setGuests(Number(number.target.value));
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
                      <p>{dateFrom ? dateFrom.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }) : "Select a date"}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p>To:</p>
                    <div className="border p-4 border-secondary bg-secondary text-primary">
                      <p>{dateTo ? dateTo.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }) : "Select a date"}</p>
                    </div>
                  </div>
                </div>
                <div className={`flex flex-col items-center space-y-3 pt-10 items-end `}>
                  <p className="text-2xl">Total: {totalPrice}kr</p>
                  {loggedIn ? (
                    pageState === "booking" ? (
                      <CustomButton
                        onClick={() => handleBookingClick(`${Urls.bookingsUrl}/${id}`, "PUT", JSON.stringify({ dateFrom: dateFrom.toISOString(), dateTo: dateTo.toISOString(), guests: guests }))}
                        className={`text-white bg-tertiary border-tertiary hover:text-tertiary hover:bg-white w-full `}
                      >
                        Update booking
                      </CustomButton>
                    ) : (
                      <CustomButton
                        onClick={() => handleBookingClick(Urls.bookingsUrl, "POST", JSON.stringify({ dateFrom: dateFrom.toISOString(), dateTo: dateTo.toISOString(), guests: guests, venueId: id }))}
                        className={`text-white bg-tertiary border-tertiary hover:text-tertiary hover:bg-white w-full `}
                      >
                        Book now
                      </CustomButton>
                    )
                  ) : (
                    <LoginButton className={`border-tertiary bg-tertiary text-white hover:bg-white hover:text-tertiary w-full`}>Login to book</LoginButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailedCard;
