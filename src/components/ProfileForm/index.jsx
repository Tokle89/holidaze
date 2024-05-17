import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomButton from "../Button";
import useLazyFetch from "../../hooks/useLazyFetch";
import executeSubmit from "../../utils/handleSubmit";
import Urls from "../../constants/url";
import { useEffect } from "react";
import useResponseHandler from "../../hooks/useResponseHandler";

import { useAuth } from "../AuthHandler";
const ProfileForm = () => {
  const { setShowProfileForm } = useAuth();
  const { response, doFetch } = useLazyFetch();
  const { name } = JSON.parse(localStorage.getItem("user"));
  console.log(name);

  const schema = yup.object({
    avatar: yup.string().url("Avatar must be a valid URL"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if (data.avatar === "") {
      delete data.avatar;
    } else {
      data.avatar = { url: data.avatar };
    }
    executeSubmit(`${Urls.profileUrl}/${name}`, "PUT", data, doFetch);
  };

  useEffect(() => {
    if (response) {
      reset();
      setShowProfileForm(false);
    }
  }, [response]);

  useResponseHandler(response, "profile", "PUT");

  return (
    <div className=" fixed inset-0 z-[1000] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative p-4  md:min-w-[400px]  rounded-lg bg-white font-sans text-base font-light leading-relaxed antialiased shadow-2xl">
        <div className="  text-right text-blue-gray-500">
          <button onClick={() => setShowProfileForm(false)} className="  font-sans text-2xl font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            x
          </button>
        </div>
        <div className="relative text-tertiary shadow-none rounded-xl bg-clip-cover">
          <div>
            <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal ">Edit your profile</h4>
            <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed"> Please enter your details to update your profile.</p>
          </div>
        </div>
        <form className="  mt-8 mb-2 space-y-6  " onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h6 className="block mb-3  font-sans  antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Profile avatar image</h6>
            <p className="font-medium text-red-700">{errors.avatar?.message}</p>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                {...register(`avatar`)}
                placeholder="Must be a valid Url"
                className="peer h-full w-full rounded-md border border-tertiary   bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:tertiary placeholder-shown:tertiary focus:border-2 focus:border-primary   focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
          </div>
          <div>
            <h6 className="block mb-3  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Register as a host</h6>
            <div className="inline-flex items-center">
              <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                <input {...register(`VenueManager`)} id="switch-1" type="checkbox" className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-blue-500 peer-checked:border-blue-500 peer-checked:before:bg-blue-500" />
                <label
                  htmlFor="switch-1"
                  className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-blue-500 peer-checked:before:bg-blue-500"
                >
                  <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4" data-ripple-dark="true"></div>
                </label>
              </div>
            </div>
          </div>
          <CustomButton type="submit" className={"w-full text-white bg-tertiary border border-tertiary hover:text-tertiary hover:bg-white"}>
            Update
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
