import { useForm } from "react-hook-form";
import CustomButton from "../Button";

const AuthForm = ({ close, mode }) => {
  const { register, handleSubmit } = useForm();

  console.log(mode);
  const onSubmit = (data) => {
    if (!mode) {
      data.avatar = { url: data.avatar };
    }
    console.log(data);
  };
  return (
    <div className=" fixed inset-0 z-[1000] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative p-4  md:min-w-[400px]  rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl">
        <div className="  text-right text-blue-gray-500">
          <button onClick={close} className="  font-sans text-2xl font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            x
          </button>
        </div>
        <div className="relative flex flex-col items-center text-tertiary shadow-none rounded-xl bg-clip-border">
          <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal ">{mode ? `Login` : `Register`}</h4>
          <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed"> Please enter your details to {mode ? `login` : `register`}.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="  mt-8 mb-2 space-y-6  ">
          {!mode && (
            <div>
              <h6 className="block mb-3  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Your user name</h6>
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
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                {...register(`password`)}
                placeholder="********"
                className="peer h-full w-full rounded-md border border-tertiary   bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:tertiary placeholder-shown:tertiary focus:border-2 focus:border-primary   focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
          </div>
          <CustomButton type="submit" className={"w-full text-white bg-tertiary border border-tertiary hover:text-tertiary hover:bg-white"}>
            Register
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
