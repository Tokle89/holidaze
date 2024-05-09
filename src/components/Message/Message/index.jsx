const UserMessage = ({ show, type, content, hideMessage }) => {
  return (
    <>
      {show && (
        <div className=" fixed inset-0 z-[1000] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
          <div className={`  relative px-4 py-10 md:min-w-[400px]  rounded bg-white font-sans text-base font-light leading-relaxed antialiased  p-5 border-2 ${type === "error" ? "border-red-800" : "border-tertiary"}`}>
            <div className="text-center">
              {type === "error" && <h2 className=" mb-3 text-red-800 text-xl font-medium border-b border-red-800">Ups something went wrong</h2>}
              <p className={` font-medium ${type === "error" ? "text-red-800" : "text-tertiary"}`}>{content}</p>
              <button className="mt-5 px-5 py-2 bg-tertiary text-white rounded" onClick={hideMessage}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserMessage;
