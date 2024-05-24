import RegisterButton from "../../components/AuthButtons/RegisterBtn";
import useAuth from "../../components/AuthHandler/AuthProvider";
import CustomButton from "../../components/Button";
import Accordion from "../../components/Accordion";
import RenderPageHeadInfo from "../../hooks/UsePageHeadHandler";

/**
 *  The Host page component that displays information about becoming a host with Holidaze.
 * @returns {JSX.Element}
 * @example
 * <HostPage />
 */

const HostPage = () => {
  const { setShowProfileForm } = useAuth();
  RenderPageHeadInfo("Host", "Become a host with Holidaze and start earning while creating unforgettable experiences");

  return (
    <main className="my-20 px-5">
      <div className="flex flex-col-reverse md:flex-row gap-10  justify-between max-w-7xl mx-auto items-center ">
        <div className="flex-1 max-w-[750px] w-full space-y-5 text-gray-700">
          <h1 className=" font-bold text-2xl md:text-3xl text-primary">Ready to become a host ?</h1>
          <p className="text-base  ">Start earning while creating unforgettable experiences </p>
          <p className="text-base">sign up now to become a Holidaze host and turn your space into a lucrative adventure!</p>
          <div className="flex flex-col md:flex-row pt-5  gap-10 justify-center md:justify-start ">
            <div className="space-y-3 text-center md:text-left">
              <p className="text-primary">Register now to become a host:</p>
              <RegisterButton className={"border border-tertiary bg-tertiary hover:bg-white hover:text-tertiary"} />
            </div>
            <p className="font-bold text-primary text-center md:text-left"> or</p>
            <div className="space-y-3 text-center md:text-left ">
              <p className="text-primary">Update your profile to become a host:</p>
              <CustomButton
                onClick={() => {
                  setShowProfileForm(true);
                }}
                className={"border border-tertiary bg-tertiary hover:bg-white hover:text-tertiary w-[200px]"}
              >
                Update Profile
              </CustomButton>
            </div>
          </div>
        </div>
        <div className="">
          <img src={"/images/host.jpg"} alt="Small toy house and house keys" className="rounded-full w-full max-w-[300px] max-h-[300px]" />
        </div>
      </div>
      <div>
        <div className="border-y-2 border-primary  max-w-7xl mx-auto my-20">
          <div className="flex flex-col lg:flex-row justify-between gap-20 lg:gap-3 items-center py-10">
            <div>
              <h2 className="text-primary mb-5">Benefits of being a holidaze host:</h2>
              <ul className="text-gray-700 space-y-3">
                <li>- Generate extra income from your property</li>
                <li>- Join a vibrant global community of hosts</li>
                <li>- Connect with people from diverse backgrounds worldwide</li>
              </ul>
            </div>
            <div>
              <h2 className="text-primary mb-5">Responsibilities of being a Holidaze host:</h2>
              <ul className="text-gray-700 space-y-3">
                <li>- Maintain a safe and clean environment for your guests</li>
                <li>- Accurately represent your property in your listing</li>
                <li>- Be accessible to address inquiries and offer assistance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between max-w-7xl mx-auto items-center ">
        <div className="max-w-[600px] ">
          <h2 className="text-primary mb-5">Frequently asked questions:</h2>
          <Accordion />
        </div>
        <div className="hidden lg:block">
          <img src={"/images/question-mark.jpg"} alt="Small toy house and house keys" className="rounded-full w-full max-w-[300px] max-h-[300px]" />
        </div>
      </div>
    </main>
  );
};

export default HostPage;
