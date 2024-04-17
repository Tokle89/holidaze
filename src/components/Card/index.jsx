import { Card, CardHeader, CardBody, CardFooter, Typography, Tooltip } from "@material-tailwind/react";
import { IoPaw } from "react-icons/io5";
import { FaParking } from "react-icons/fa";
import { MdFoodBank } from "react-icons/md";
import { Link } from "react-router-dom";
import CustomButton from "../Button";
import TruncateTitle from "../TruncateTitle";

const CardLink = ({ data }) => {
  const { media, name, location, rating, meta, price } = data;
  const { wifi, parking, breakfast, pets } = meta;
  return (
    <Card className="w-full max-w-[26rem] shadow-lg h-[480px] flex flex-col m-auto">
      <CardHeader floated={false} color="blue-gray" className="min-h-[205px]">
        <img src={media[0].url} alt={name} className="h-[205px] w-full" />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
      </CardHeader>
      <CardBody className="flex-1 py-5 pt-5 pb-0">
        <div className=" flex items-center justify-between">
          <Typography variant="h5" className="font-medium text-black ">
            <TruncateTitle title={name} />
          </Typography>

          <Typography color="blue-gray" className="flex items-center gap-1.5 font-normal">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="-mt-0.5 h-5 w-5 text-yellow-700">
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            {rating}
          </Typography>
        </div>
        <Typography variant="h6" className="font-medium text-black ">
          {location.city}
        </Typography>
        <Typography color="gray">
          <span className="font-bold text-red-600">{price} KR</span> per night
        </Typography>
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
      </CardBody>
      <CardFooter className="pt-4 mt-auto">
        <Link to={`/venue/${data.id}`}>
          <CustomButton className="w-full bg-tertiary text-white border-tertiary hover:bg-white hover:text-tertiary">View venue</CustomButton>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CardLink;
