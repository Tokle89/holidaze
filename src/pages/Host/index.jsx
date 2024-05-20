import RegisterButton from "../../components/AuthButtons/RegisterBtn";
import { useAuth } from "../../components/AuthHandler";
import CustomButton from "../../components/Button";
import Accordion from "../../components/Accordion";
const HostPage = () => {
  const { setShowProfileForm } = useAuth();
  return (
    <main className="my-20 px-5">
      <div className="flex justify-between max-w-7xl mx-auto items-center ">
        <div className="flex-1 max-w-[750px] w-full space-y-5 text-gray-700">
          <h1 className=" font-bold text-primary">Ready to become a host ?</h1>
          <p className="text-lg ">Start earning while creating unforgettable experiences - sign up now to become a Holidaze host and turn your space into a lucrative adventure!</p>
          <div className="flex gap-20 ">
            <div className="space-y-3">
              <p>Register now to become a host:</p>
              <RegisterButton className={"border border-tertiary bg-tertiary hover:bg-white hover:text-tertiary"} />
            </div>
            <p className="font-bold text-primary"> or</p>
            <div className="space-y-3">
              <p>Update your profile to become a host:</p>
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
      <div className="flex justify-between max-w-7xl mx-auto items-center my-20">
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
      <div className="flex justify-between max-w-7xl mx-auto items-center ">
        <div className="max-w-[600px] ">
          <h2 className="text-primary mb-5">Frequently asked questions:</h2>
          <Accordion />
        </div>
        <div>
          <img src={"/images/question-mark.jpg"} alt="Small toy house and house keys" className="rounded-full w-full max-w-[300px] max-h-[300px]" />
        </div>
      </div>
    </main>
  );
};

export default HostPage;
