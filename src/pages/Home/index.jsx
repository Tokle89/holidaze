import HeroSection from "../../components/HeroSection";
import VenueSection from "../../components/VenueSection";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import RenderPageHeadInfo from "../../hooks/UsePageHeadHandler";

/**
 *  The Home page component that displays the HeroSection and VenueSection components. It uses the useLocation hook to access the URL hash and the RenderPageHeadInfo hook to set the dynamic header based on the sorting parameters.
 * The useEffect hook scrolls to the venues section based on the URL hash, for when the user for example clicks on the "Next" Button in the pagination component.
 * @returns {JSX.Element}
 * @example
 * <Home />
 */

const Home = () => {
  const { hash } = useLocation();
  RenderPageHeadInfo("Home", "Holidaze is a platform that allows you to find and book your perfect holiday. As a venue manager, you can also create and manage your own venues.");
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
