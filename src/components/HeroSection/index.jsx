import Search from "../Search";

const HeroSection = () => {
  return (
    <div className="relative h-[450px] ">
      <div className="relative bg-cover  bg-center w-full h-full" style={{ backgroundImage: `url(/images/background.jpg)` }}>
        <div className="absolute top-0 left-0 right-0 h-3/5 bg-gradient-to-b from-primary to-transparent opacity-100">
          <div className="absolute inset-0 bg-gradient-to-b from-primary to-transparent "></div>
          <div className="absolute inset-0 flex mt-[100px] justify-center text-center text-white px-5">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl  mb-10">Your adventure starts here</h2>
              <Search />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
