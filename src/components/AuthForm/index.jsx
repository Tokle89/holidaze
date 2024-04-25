import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomButton from "../Button";
import Urls from "../../constants/url";
import { useEffect, useState } from "react";
import useLazyFetch from "../../hooks/useLazyFetch";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ close, mode, setMode }) => {
  const [authUrl, setAuthUrl] = useState(mode ? Urls.loginUrl : Urls.registerUrl);
  const [successMessage, setSuccessMessage] = useState(false);
  const { response, error, doFetch } = useLazyFetch();
  const navigate = useNavigate();

  const schema = yup.object({
    name: mode
      ? yup.string()
      : yup
          .string()
          .matches(/^[a-zA-Z0-9_]*$/, "Name must not contain punctuation symbols apart from underscore (_)")
          .required("Name is required"),
    email: yup.string().email().matches("stud.noroff.no", "Email must be a valid stud.noroff.no email").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    avatar: mode ? yup.string() : yup.string().url("Avatar must be a valid URL"),
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
    if (!mode) {
      data.avatar = { url: data.avatar };
    }
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    doFetch(authUrl, fetchOptions);
  };

  useEffect(() => {
    setAuthUrl(mode ? Urls.loginUrl : Urls.registerUrl);
  }, [mode]);

  useEffect(() => {
    if (response && !mode) {
      console.log(response);
      setMode(true);
      setSuccessMessage(true);
      reset();
    } else if (response && mode) {
      console.log(response);
      console.log("Login successful");
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/profile");
      close();
    } else if (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, error]);
  return (
    <div className=" fixed inset-0 z-[1000] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative p-4  md:min-w-[400px]  rounded-lg bg-white font-sans text-base font-light leading-relaxed antialiased shadow-2xl">
        <div className="  text-right text-blue-gray-500">
          <button onClick={close} className="  font-sans text-2xl font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            x
          </button>
        </div>
        <div className="relative  text-tertiary shadow-none rounded-xl bg-clip-border">
          {successMessage ? (
            <div className="flex flex-col items-center">
              <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal ">Registration successful</h4>
              <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed"> Please enter login to enter</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal ">{mode ? `Login` : `Register`}</h4>
              <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed"> Please enter your details to {mode ? `login` : `register`}.</p>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="  mt-8 mb-2 space-y-6  ">
          {!mode && (
            <div>
              <h6 className="block mb-3  font-sans  antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Your user name</h6>
              <p className=" text-red-700 font-medium">{errors.name?.message}</p>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  {...register(`name`)}
                  placeholder="example username"
                  className="peer h-full w-full rounded-md border border-tertiary   bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:tertiary placeholder-shown:tertiary focus:border-2 focus:border-primary   focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
              </div>
            </div>
          )}
          <div>
            <h6 className="block mb-3  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Your email address</h6>
            <p className="font-medium text-red-700">{errors.email?.message}</p>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                {...register(`email`)}
                placeholder="example@stud.noroff.no"
                className="peer h-full w-full rounded-md border border-tertiary   bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:tertiary placeholder-shown:tertiary focus:border-2 focus:border-primary   focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
          </div>
          {!mode && (
            <div>
              <h6 className="block mb-3  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Your profile avatar</h6>
              <p className="font-medium text-red-700">{errors.avatar?.message}</p>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  {...register(`avatar`)}
                  placeholder="Must be a valid Url"
                  className="peer h-full w-full rounded-md border border-tertiary   bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:tertiary placeholder-shown:tertiary focus:border-2 focus:border-primary   focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
              </div>
            </div>
          )}
          <div>
            <h6 className="block mb-3  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Your Password</h6>
            <p className="font-medium text-red-700">{errors.password?.message}</p>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                {...register(`password`)}
                placeholder="********"
                className="peer h-full w-full rounded-md border border-tertiary   bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:tertiary placeholder-shown:tertiary focus:border-2 focus:border-primary   focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
          </div>
          {!mode && (
            <div>
              <h6 className="block mb-3  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Register as a host</h6>
              <div className="inline-flex items-center">
                <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                  <input {...register(`venuesManager`)} id="switch-1" type="checkbox" className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-blue-500 peer-checked:border-blue-500 peer-checked:before:bg-blue-500" />
                  <label
                    htmlFor="switch-1"
                    className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-blue-500 peer-checked:before:bg-blue-500"
                  >
                    <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4" data-ripple-dark="true"></div>
                  </label>
                </div>
              </div>
            </div>
          )}
          <CustomButton type="submit" className={"w-full text-white bg-tertiary border border-tertiary hover:text-tertiary hover:bg-white"}>
            {mode ? `Login` : `Register`}
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
