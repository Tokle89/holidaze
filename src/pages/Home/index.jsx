import HeroSection from "../../components/HeroSection";
import VenueSection from "../../components/VenueSection";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash.startsWith("#venues")) {
      window.scrollTo({
        top: document.querySelector(hash.split("?")[0]).offsetTop,
        behavior: "smooth",
      });
    }
  }, [hash]);

  return (
    <main>
      <HeroSection />
      <VenueSection />
    </main>
  );
};

export default Home;
