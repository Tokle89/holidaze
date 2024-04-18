import HeroSection from "../../components/HeroSection";
import Urls from "../../constants/url";
import VenueSection from "../../components/VenueSection";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <VenueSection url={Urls.venuesUrl} />
    </main>
  );
};

export default Home;
