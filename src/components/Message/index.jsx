import { useState } from "react";

const UserMessage = (show, type, message) => {
  const [display, setDisplay] = useState(false);
  return (
    <>
      {display && (
        <div className=" fixed inset-0 z-[1000] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative p-4  md:min-w-[400px]  rounded-lg bg-white font-sans text-base font-light leading-relaxed antialiased shadow-2xl">
            <div className="">
              <p>hello</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserMessage;
