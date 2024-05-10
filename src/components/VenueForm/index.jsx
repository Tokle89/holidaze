import CustomButton from "../Button";
import { useState } from "react";
const VenueForm = ({ setToggleForm }) => {
  const [mediaInputs, setMediaInputs] = useState([{ url: "" }]);

  const addMediaInput = () => {
    setMediaInputs([...mediaInputs, { url: "" }]);
  };

  const handleInputChange = (e, index) => {
    const newMediaInputs = [...mediaInputs];
    newMediaInputs[index].url = e.target.value;
    setMediaInputs(newMediaInputs);
  };
  return (
    <div className=" fixed inset-0 z-[1000] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative p-4  md:min-w-[400px]  rounded-lg bg-white font-sans text-base font-light leading-relaxed antialiased shadow-2xl">
        <div className="  text-right text-blue-gray-500">
          <button
            onClick={() => {
              setToggleForm(false);
            }}
            className="  font-sans text-2xl font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            x
          </button>
        </div>
        <div className="relative  text-tertiary shadow-none rounded-xl bg-clip-border">
          <div className="flex flex-col items-center">
            <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal ">Create venue</h4>
          </div>
        </div>
        <form className="  mt-8 mb-2 space-y-6  ">
          <div>
            <h6 className="block mb-2  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Name</h6>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                placeholder="Name of your venue"
                className="peer h-full w-full rounded-md border border-tertiary   bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:tertiary placeholder-shown:tertiary focus:border-2 focus:border-primary   focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
          </div>
          <div>
            <h6 className="block mb-2  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary ">Description</h6>
            <div className="relative min-h-[80px] w-full min-w-[200px]">
              <textarea
                placeholder="Description of your venue"
                className="peer min-h-[80px] w-full rounded-md border border-tertiary   bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:tertiary placeholder-shown:tertiary focus:border-2 focus:border-primary   focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between align-center">
              <h6 className="block mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-tertiary">Media</h6>
              <button className="font-bold text-tertiary text-3xl" onClick={addMediaInput}>
                +
              </button>
            </div>
            {mediaInputs.map((input, index) => (
              <div key={index} className="relative h-11 w-full min-w-[200px]">
                <input
                  value={input.url}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Media URL"
                  className="peer h-full w-full rounded-md border border-tertiary bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:tertiary placeholder-shown:tertiary focus:border-2 focus:border-primary focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
              </div>
            ))}
          </div>

          <CustomButton type="submit" className={"w-full text-white bg-tertiary border border-tertiary hover:text-tertiary hover:bg-white"}>
            submit
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default VenueForm;
