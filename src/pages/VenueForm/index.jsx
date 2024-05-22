import CustomButton from "../../components/Button";
import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import executeSubmit from "../../utils/handleSubmit";
import Urls from "../../constants/url";
import useLazyFetch from "../../hooks/useLazyFetch";
import useResponseHandler from "../../hooks/useResponseHandler";
import { useLocation } from "react-router-dom";
import { HiOutlinePlusSm, HiOutlineMinus } from "react-icons/hi";

const VenueForm = () => {
  const [step, setStep] = useState(1);
  const progressWidthClasses = ["w-1/4", "w-2/4", "w-3/4", "w-full"];
  const { response, doFetch } = useLazyFetch();
  let { state } = useLocation();
  const { name, description, media, price, maxGuests, rating, meta, location } = state ? state : {};
  const { wifi, pets, breakfast, parking } = meta ? meta : {};
  const { address, city, zip, country } = location ? location : {};
  let method = state ? `PUT` : `POST`;
  let url = state ? `${Urls.venuesUrl}/${state.id}` : Urls.venuesUrl;

  const schema = yup.object({
    name: yup.string().min(3).required(`Name is required`),
    description: yup.string().min(3).required(`Description is required`),
    media: yup
      .array()
      .of(
        yup.object().shape({
          url: yup.string().url(`Must be a valid URL`).max(300, `url can not be longer than 300 characters`),
        })
      )
      .max(8, `You can only max add 8 images`),
    price: yup
      .number()
      .nullable()
      .transform((value, originalValue) => (originalValue.trim() === "" ? null : value))
      .min(1, "Price must be at least 1")
      .required(`Price is required`),
    maxGuests: yup
      .number()
      .nullable()
      .transform((value, originalValue) => (originalValue.trim() === "" ? null : value))
      .min(1, "Max guests must be at least 1")
      .max(100)
      .required(`Max guests is required`),
    rating: yup
      .number()
      .nullable()
      .transform((value, originalValue) => (originalValue.trim() === "" ? null : value))
      .min(0, "Rating must be at least 0")
      .max(5, "Rating must be at most 5")
      .required("Rating is required"),

    location: yup.object({
      address: yup.string().required("Address is required"),
      city: yup.string().required("City is required"),
      country: yup.string().required("Country is required"),
    }),
  });
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      name: name ? name : "",
      description: description ? description : "",
      media: media?.length > 0 ? media : [{ url: "" }],
      price: price ? price : "",
      maxGuests: maxGuests ? maxGuests : "",
      rating: rating ? rating : "",
      meta: {
        wifi: wifi ? wifi : false,
        parking: parking ? parking : false,
        breakfast: breakfast ? breakfast : false,
        pets: pets ? pets : false,
      },
      location: {
        address: address ? address : "",
        city: city ? city : "",
        zip: zip ? zip : "",
        country: country ? country : "",
      },
    },
    resolver: yupResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  const watchAllFields = watch();

  const FieldsPerStep = [
    [`name`, `description`, `media`, `price`, `maxGuests`],
    [`rating`, `wifi`, `pets`, `breakfast`, `parking`],
    [`location.address`, `location.city`, `location.zip`, `location.country`],
  ];

  const nextStep = async () => {
    const result = await trigger(FieldsPerStep[step - 1]);
    if (result) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = (data) => {
    data.media = data.media.filter((media) => media.url !== "");
    console.log("data", data);

    executeSubmit(url, method, data, doFetch);
  };

  useResponseHandler(response, "venue", method);
  return (
    <main className="m-auto my-10  ">
      <div className=" w-full md:w-[600px]">
        <div className="  text-right text-blue-gray-500"></div>
        <div className="relative  text-tertiary shadow-none rounded-xl bg-clip-border">
          <div className="flex flex-col items-center">
            <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal mb-3 ">{state ? `Update venue` : `Create venue`}</h4>
            <div className="flex w-full h-7 overflow-hidden font-sans text-base font-medium rounded-full flex-start bg-white border-2 border-tertiary">
              <div className={`flex items-center justify-center h-full overflow-hidden text-white break-all bg-tertiary rounded-full transition-width duration-500 ease-in-out ${progressWidthClasses[step - 1]}`}>{step * 25}%</div>
            </div>
          </div>
        </div>
        <form className="  mt-8 mb-2 space-y-6  " onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <>
              <div>
                <h6 className="block mb-2  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Name </h6>
                <p className=" text-red-700 font-medium mb-1">{errors.name?.message}</p>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    {...register(`name`)}
                    placeholder="Name of your venue"
                    className="peer h-full w-full rounded-md border border-tertiary   bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:tertiary placeholder-shown:tertiary focus:border-2 focus:border-primary   focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                </div>
              </div>
              <div>
                <h6 className="block mb-2  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Description </h6>
                <p className=" text-red-700 font-medium mb-1">{errors.description?.message}</p>
                <div className="relative min-h-[80px] w-full min-w-[200px]">
                  <textarea
                    {...register(`description`)}
                    placeholder="Description of your venue"
                    className="peer min-h-[80px] w-full rounded-md border border-tertiary   bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:tertiary placeholder-shown:tertiary focus:border-2 focus:border-primary   focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between align-center">
                  <h6 className="block mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary">Url link of venue images</h6>
                  <button type="button" className="  font-bold text-tertiary text-3xl hover:text-primary " onClick={() => append({ url: "" })} disabled={fields.length >= 8}>
                    <HiOutlinePlusSm />
                  </button>
                </div>

                {fields.map((item, index) => (
                  <div key={item.id} className="relative h-11 w-full min-w-[200px]">
                    <p className=" text-red-700 font-medium my-1">{errors.media && errors.media[index] && errors.media[index].url && errors.media[index].url.message}</p>
                    <div className={`flex ${length > 1 && `me-2`}`}>
                      <input
                        {...register(`media.${index}.url`)}
                        placeholder="Url link to venue image"
                        className="peer h-full w-full rounded-md border border-tertiary bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:tertiary placeholder-shown:tertiary focus:border-2 focus:border-primary focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      />
                      {fields.length > 1 && (
                        <button type="button" className=" ms-2 text-2xl font-extrabold text-tertiary  hover:text-primary" onClick={() => remove(index)}>
                          <HiOutlineMinus />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <h6 className="block mb-2  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Price per night</h6>
                <p className=" text-red-700 font-medium mb-1">{errors.price?.message}</p>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    min="1"
                    type="number"
                    {...register(`price`)}
                    placeholder="The price pr night in NOK"
                    className="peer h-full w-full rounded-md border border-tertiary   bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:tertiary placeholder-shown:tertiary focus:border-2 focus:border-primary   focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                </div>
              </div>
              <div>
                <h6 className="block mb-2  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Maximum number of guests </h6>
                <p className=" text-red-700 font-medium mb-1">{errors.maxGuests?.message}</p>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    min="1"
                    type="number"
                    {...register(`maxGuests`)}
                    placeholder="The maximum number of guests allowed in the venue"
                    className="peer h-full w-full rounded-md border border-tertiary   bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:tertiary placeholder-shown:tertiary focus:border-2 focus:border-primary   focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                </div>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div>
                <h6 className="block mb-2  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Rating ( from 0 to 5)</h6>
                <p className=" text-red-700 font-medium mb-1">{errors.rating?.message}</p>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    type="number"
                    {...register(`rating`)}
                    placeholder="Rate your venue from 0 to 5"
                    className="peer h-full w-full rounded-md border border-tertiary   bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:tertiary placeholder-shown:tertiary focus:border-2 focus:border-primary   focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <h6 className="block mb-3  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Wifi</h6>
                  <div className="inline-flex items-center">
                    <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                      <input id="switch-1" type="checkbox" {...register(`meta.wifi`)} className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-blue-500 peer-checked:border-blue-500 peer-checked:before:bg-blue-500" />
                      <label
                        htmlFor="switch-1"
                        className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-blue-500 peer-checked:before:bg-blue-500"
                      >
                        <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4" data-ripple-dark="true"></div>
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <h6 className="block mb-3  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Parking</h6>
                  <div className="inline-flex items-center">
                    <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                      <input id="switch-2" {...register(`meta.parking`)} type="checkbox" className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-blue-500 peer-checked:border-blue-500 peer-checked:before:bg-blue-500" />
                      <label
                        htmlFor="switch-2"
                        className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-blue-500 peer-checked:before:bg-blue-500"
                      >
                        <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4" data-ripple-dark="true"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h6 className="block mb-3  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Breakfast</h6>
                  <div className="inline-flex items-center">
                    <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                      <input id="switch-3" {...register(`meta.breakfast`)} type="checkbox" className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-blue-500 peer-checked:border-blue-500 peer-checked:before:bg-blue-500" />
                      <label
                        htmlFor="switch-3"
                        className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-blue-500 peer-checked:before:bg-blue-500"
                      >
                        <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4" data-ripple-dark="true"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h6 className="block mb-3  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Pets</h6>
                  <div className="inline-flex items-center">
                    <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                      <input id="switch-4" {...register(`meta.pets`)} type="checkbox" className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-blue-500 peer-checked:border-blue-500 peer-checked:before:bg-blue-500" />
                      <label
                        htmlFor="switch-4"
                        className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-blue-500 peer-checked:before:bg-blue-500"
                      >
                        <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4" data-ripple-dark="true"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div>
                <h6 className="block mb-2  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary "> Street address</h6>
                <p className=" text-red-700 font-medium mb-1">{errors.location?.address.message}</p>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    {...register(`location.address`)}
                    placeholder="Street address"
                    className="peer h-full w-full rounded-md border border-tertiary   bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:tertiary placeholder-shown:tertiary focus:border-2 focus:border-primary   focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                </div>
              </div>
              <div>
                <h6 className="block mb-2  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary "> City</h6>
                <p className=" text-red-700 font-medium mb-1">{errors.location?.city.message}</p>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    {...register(`location.city`)}
                    placeholder="City"
                    className="peer h-full w-full rounded-md border border-tertiary   bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:tertiary placeholder-shown:tertiary focus:border-2 focus:border-primary   focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                </div>
              </div>
              <div>
                <h6 className="block mb-2  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary "> Zip code</h6>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    {...register(`location.zip`)}
                    placeholder="Zip code"
                    className="peer h-full w-full rounded-md border border-tertiary   bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:tertiary placeholder-shown:tertiary focus:border-2 focus:border-primary   focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                </div>
              </div>
              <div>
                <h6 className="block mb-2  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary "> Country</h6>
                <p className=" text-red-700 font-medium mb-1">{errors.location?.country.message}</p>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    {...register(`location.country`)}
                    placeholder="Country"
                    className="peer h-full w-full rounded-md border border-tertiary   bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:tertiary placeholder-shown:tertiary focus:border-2 focus:border-primary   focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                </div>
              </div>
            </>
          )}
          {step !== 4 && (
            <div className={`flex gap-5  ${step <= 1 ? `justify-center` : `justify-between`}`}>
              {step > 1 && (
                <CustomButton
                  onClick={() => {
                    if (step > 1) prevStep();
                  }}
                  className={`w-[150px] md:w-1/4 text-white bg-tertiary border border-tertiary hover:text-tertiary hover:bg-white  `}
                >
                  Previous
                </CustomButton>
              )}

              <CustomButton onClick={nextStep} className={" w-[150px] md:w-1/4 text-white bg-tertiary border border-tertiary hover:text-tertiary hover:bg-white"}>
                Next
              </CustomButton>
            </div>
          )}
          {step === 4 && (
            <>
              <div className="border border-tertiary p-5">
                <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal ">Review your venue</h4>
                <div className="flex flex-col gap-2">
                  <div>
                    <h6 className="block mb-2  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Name </h6>
                    <p className=" text-blue-gray-500">{watchAllFields.name}</p>
                  </div>
                  <div>
                    <h6 className="block mb-2  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Description </h6>
                    <p className=" text-blue-gray-500">{watchAllFields.description}</p>
                  </div>
                  <div>
                    <h6 className="block mb-2  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Venue images Url`S` </h6>
                    {watchAllFields.media.map((media, index) => (
                      <p key={index} className=" text-blue-gray-500 break-all mb-3">
                        {media.url}
                      </p>
                    ))}
                  </div>
                  <div>
                    <h6 className="block mb-2  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Price per night</h6>
                    <p className=" text-blue-gray-500">{watchAllFields.price}</p>
                  </div>
                  <div>
                    <h6 className="block mb-2  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Maximum number of guests </h6>
                    <p className=" text-blue-gray-500">{watchAllFields.maxGuests}</p>
                  </div>
                  <div>
                    <h6 className="block mb-2  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Rating ( from 0 to 5)</h6>
                    <p className=" text-blue-gray-500">{watchAllFields.rating}</p>
                  </div>
                  <div>
                    <h6 className="block mb-2  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Wifi</h6>
                    <p className=" text-blue-gray-500">{watchAllFields.meta.wifi ? `Yes` : `No`}</p>
                  </div>
                  <div>
                    <h6 className="block mb-2  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Parking</h6>
                    <p className=" text-blue-gray-500">{watchAllFields.meta.parking ? `Yes` : `No`}</p>
                  </div>
                  <div>
                    <h6 className="block mb-2  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">breakfast</h6>
                    <p className=" text-blue-gray-500">{watchAllFields.meta.breakfast ? `Yes` : `No`}</p>
                  </div>
                  <div>
                    <h6 className="block mb-2  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">pets</h6>
                    <p className=" text-blue-gray-500">{watchAllFields.meta.pets ? `Yes` : `No`}</p>
                  </div>
                  <div>
                    <h6 className="block mb-2  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary "> Street address</h6>
                    <p className=" text-blue-gray-500">{watchAllFields.location.address}</p>
                  </div>
                  <div>
                    <h6 className="block mb-2  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary "> City</h6>
                    <p className=" text-blue-gray-500">{watchAllFields.location.city}</p>
                  </div>
                  <div>
                    <h6 className="block mb-2  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary "> Zip code</h6>
                    <p className=" text-blue-gray-500">{watchAllFields.location.zip}</p>
                  </div>
                  <div>
                    <h6 className="block mb-2  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary "> Country</h6>
                    <p className=" text-blue-gray-500">{watchAllFields.location.country}</p>
                  </div>
                </div>
              </div>

              <div className="flex  gap-5 justify-between">
                <CustomButton
                  onClick={() => {
                    if (step > 1) prevStep();
                  }}
                  className={`w-[150px] md:w-1/4 text-white bg-tertiary border border-tertiary hover:text-tertiary hover:bg-white ${step === 1 && `bg-blue-300 border-blue-300`} `}
                >
                  Previous
                </CustomButton>
                <CustomButton type="submit" className={" w-[150px] md:w-1/4 text-white bg-tertiary border border-tertiary hover:text-tertiary hover:bg-white"}>
                  {state ? `Update` : `Submit`}
                </CustomButton>
              </div>
            </>
          )}
        </form>
      </div>
    </main>
  );
};

export default VenueForm;
