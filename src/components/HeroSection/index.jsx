import CustomButton from "../../components/Button";
const HeroSection = () => {
  return (
    <div className="relative h-[450px]">
      <div className="relative bg-cover bg-center w-full h-full" style={{ backgroundImage: `url(/public/images/background.jpg)` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-primary to-transparent mix-blend-multiply"></div>
        <div className="absolute inset-0 flex mt-20 justify-center text-center text-secondary">
          <div className="relative z-10">
            <h2 className="text-4xl  mb-4">Your adventure starts here</h2>
            <div className="flex justify-center mb-4">
              <input type="text" className="px-4 py-2 mr-2 rounded-l-md border-2 border-tertiary focus:outline-none" placeholder="Search..." />
              <CustomButton className="text-white bg-tertiary border-tertiary  hover:bg-white hover:text-tertiary">Search</CustomButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
