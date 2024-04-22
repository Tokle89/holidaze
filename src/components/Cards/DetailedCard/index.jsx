import { Carousel } from "@material-tailwind/react";
import { FaBed, FaParking } from "react-icons/fa";
import { IoPaw } from "react-icons/io5";
import { MdFoodBank } from "react-icons/md";
import { Tooltip } from "@material-tailwind/react";

const DetailedCard = (data) => {
  console.log(data);
  const { media, name, location, maxGuests, meta, description } = data.data;
  const { wifi, parking, breakfast, pets } = meta;

  return (
    <div className="max-w-7xl m-auto ">
      <Carousel>
        {media.map((image) => (
          <img src={image.url} alt={image.alt} key={image.url} className="max-h-[430px]  w-full max-w-7xl object-fill" />
        ))}
      </Carousel>
      <div className=" flex">
        <div>
          <h1>{name}</h1>
          <p>{location.address}</p>
          <p>
            {location.city}, {location.country}
          </p>
          <div className="flex">
            {" "}
            <FaBed /> <p>{maxGuests} Beds</p>
          </div>
          <div className="group mt-3 inline-flex flex-wrap items-center gap-3">
            {wifi && (
              <Tooltip content="Free wifi">
                <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
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
                <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                  <MdFoodBank className="h-5 w-5" />
                </span>
              </Tooltip>
            )}
            {parking && (
              <Tooltip content="Free parking">
                <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                  <FaParking className="h-5 w-5" />
                </span>
              </Tooltip>
            )}
            {pets && (
              <Tooltip content="Pets Allowed">
                <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                  <IoPaw className="h-5 w-5" />
                </span>
              </Tooltip>
            )}
          </div>
          <h2>Description:</h2>
          <p>{description}</p>
        </div>
        <div>
          <h3>Select your dates</h3>
        </div>
      </div>
    </div>
  );
};

export default DetailedCard;
