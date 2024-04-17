import HeroSection from "../../components/HeroSection";
import RegisterOptionSection from "../../components/RegisterOptionSection";
import Urls from "../../constants/url";
import VenueSection from "../../components/VenueSection";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <RegisterOptionSection />
      <VenueSection url={Urls.venuesUrl} />
    </main>
  );
};

export default Home;
