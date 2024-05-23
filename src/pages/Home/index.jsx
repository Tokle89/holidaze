import HeroSection from "../../components/HeroSection";
import VenueSection from "../../components/VenueSection";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import RenderPageHeadInfo from "../../hooks/UsePageHeadHandler";

const Home = () => {
  const { hash } = useLocation();
  RenderPageHeadInfo("Holidaze | Home", "Holidaze is a platform that allows you to find and book your perfect holiday. As a venue manager, you can also create and manage your own venues.");
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
