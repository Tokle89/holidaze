import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomButton from "../../Button";
import Urls from "../../../constants/url";
import { useEffect, useState } from "react";
import useLazyFetch from "../../../hooks/useLazyFetch";
import { useNavigate } from "react-router-dom";
import useAuth from "../../AuthHandler/useAuth";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

/**
 * A form component that handles user authentication. It allows users to login or register. It uses the useAuth hook to manage the authentication state that decides if the user is shown the login or register form. The form uses the react-hook-form library for form validation and the yup library for schema validation.
 * @returns {JSX.Element}
 * @example
 * <AuthForm />
 */

const AuthForm = () => {
  const { authMode, setAuthMode, setShowModal, setLoggedIn } = useAuth();
  const [authUrl, setAuthUrl] = useState(authMode ? Urls.loginUrl : Urls.registerUrl);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { response, error, doFetch } = useLazyFetch();
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();

  /**
   * A schema object that defines the validation rules for the form fields.
   */
  const schema = yup.object({
    name: authMode
      ? yup.string()
      : yup
          .string()
          .matches(/^[a-zA-Z0-9_]*$/, "Name must not contain punctuation symbols apart from underscore (_)")
          .required("Name is required"),
    email: yup.string().email().matches("stud.noroff.no", "Email must be a valid stud.noroff.no email").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    avatar: authMode ? yup.string() : yup.string().url("Avatar must be a valid URL"),
  });

  /**
   * A custom hook that handles form submission and validation.
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  /**
   * Function that handles form submission. It sends a POST request to the server with the form data. It uses AuthUrl to determine the endpoint to send the request to, and authMode to determine if the avatar field should be included in the form data.
   * @param {object} data  - An object containing the form data.
   */
  const onSubmit = (data) => {
    if (!authMode) {
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
  /**
   * A useEffect hook that listens for changes in the authMode state. It updates the authUrl state based on the authMode value.
   */
  useEffect(() => {
    setAuthUrl(authMode ? Urls.loginUrl : Urls.registerUrl);
  }, [authMode]);

  /**
   * A useEffect hook that listens for changes in the response and error states. It updates the errorMessage and successMessage states based on the response and error values. It also updates the authMode state based on the response value.
   * If a user is registered successfully it changes the authMode state to true and displays a success message and takes the user to the login form.
   * If a user logs in successfully it saves the user data to the local storage and takes the user to the profile page.
   */
  useEffect(() => {
    if (response?.errors) {
      setErrorMessage(true);
      return;
    }
    if (response && !authMode) {
      console.log(response);
      setAuthMode(true);
      setSuccessMessage(true);
      reset();
    } else if (response && authMode) {
      localStorage.setItem("user", JSON.stringify(response.data));
      const userName = response.data.name;
      setLoggedIn(true);
      setShowModal(false);
      setTimeout(() => {
        navigate("/profile/" + userName);
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, error]);
  return (
    <div onMouseDown={() => setShowModal(false)} className="  fixed inset-0 z-[1000] grid h-screen w-screen  place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
      <div onMouseDown={(e) => e.stopPropagation()} className="relative p-4 md:w-[450px] rounded-lg bg-white font-sans text-base font-light leading-relaxed antialiased shadow-2xl overflow-y-auto mt-16 mb-16 h-3/4 md:h-auto">
        <div className="  text-right text-blue-gray-500">
          <button onClick={() => setShowModal(false)} className="  font-sans text-2xl font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
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
              <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal ">{authMode ? `Login` : `Register`}</h4>
              <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed"> Please enter your details to {authMode ? `login` : `register`}.</p>
              <p className="block mt-2 font-sans text-base antialiased font-normal leading-relaxed"> {authMode ? `Not registered ?` : `Already registered ?`} </p>
              {authMode ? (
                <CustomButton onClick={() => setAuthMode(false)} className={" w-[230px] py-2 text-white bg-primary border border-primary hover:text-primary hover:bg-white"}>
                  Register here
                </CustomButton>
              ) : (
                <CustomButton onClick={() => setAuthMode(true)} className={"w-[230px] py-2 text-white bg-primary border border-primary hover:text-primary hover:bg-white"}>
                  Login here
                </CustomButton>
              )}
            </div>
          )}

          {errorMessage && (
            <div className="flex flex-col items-center">
              <p className="block mt-1 font-sans text-1xl text-red-800 antialiased font-medium leading-relaxed"> {response.errors[0].message}</p>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="  mt-8 mb-2 space-y-6  ">
          {!authMode && (
            <div>
              <h6 className="block mb-3  font-sans  antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">User name</h6>
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
            <h6 className="block mb-3  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Email address</h6>
            <p className="font-medium text-red-700">{errors.email?.message}</p>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                {...register(`email`)}
                placeholder="example@stud.noroff.no"
                className="peer h-full w-full rounded-md border border-tertiary   bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:tertiary placeholder-shown:tertiary focus:border-2 focus:border-primary   focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
          </div>
          {!authMode && (
            <div>
              <h6 className="block mb-3  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Profile avatar</h6>
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
            <h6 className="block mb-3  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Password</h6>
            <p className="font-medium text-red-700">{errors.password?.message}</p>
            <div className="flex">
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  {...register(`password`)}
                  type={showPassword ? "password" : "text"}
                  placeholder="********"
                  className="peer h-full w-full rounded-md border border-tertiary   bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:tertiary placeholder-shown:tertiary focus:border-2 focus:border-primary   focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
              </div>
              {showPassword ? (
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  <IoEyeOffOutline className="text-2xl ms-3 text-primary" />
                </button>
              ) : (
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  <IoEyeOutline className="text-2xl ms-3 text-primary" />
                </button>
              )}
            </div>
          </div>
          {!authMode && (
            <div>
              <h6 className="block mb-3  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Register as a host</h6>
              <div className="inline-flex items-center">
                <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                  <input {...register(`venueManager`)} id="switch-1" type="checkbox" className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-blue-500 peer-checked:border-blue-500 peer-checked:before:bg-blue-500" />
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
            {authMode ? `Login` : `Register`}
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
