import CustomButton from "../../components/Button";
const HeroSection = () => {
  return (
    <div className="relative h-[450px] ">
      <div className="relative bg-cover  bg-center w-full h-full" style={{ backgroundImage: `url(/images/background.jpg)` }}>
        <div className="absolute top-0 left-0 right-0 h-3/5 bg-gradient-to-b from-primary to-transparent opacity-100">
          <div className="absolute inset-0 bg-gradient-to-b from-primary to-transparent "></div>
          <div className="absolute inset-0 flex mt-[100px] justify-center text-center text-secondary">
            <div className="relative z-10">
              <h2 className="text-4xl  mb-10">Your adventure starts here</h2>
              <div className="flex justify-center  ">
                <input type="text" className="px-4 py-2 mr-2 rounded-l-md border-2 border-secondary focus:outline-none placeholder:text-gray-700" placeholder="Search..." />
                <CustomButton className="text-primary bg-orange border-secondary  hover:bg-white hover:text-primary">Search</CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
