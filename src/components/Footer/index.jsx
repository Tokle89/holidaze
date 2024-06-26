import { Link } from "react-router-dom";
import Logo from "../Logo";

/**
 * Footer component that displays the Logo, the technologies used, and the social media links.
 * @returns {JSX.Element}
 */

const Footer = () => (
  <footer className="  bg-primary p-5  text-white">
    <div className="max-w-7xl m-auto flex flex-col md:flex-row gap-5  items-center md:justify-between md:items-start">
      <Logo />
      <div className="flex space-x-20 ">
        <div className="space-y-4">
          <p className="font-bold">Made With</p>
          <p>Noroff Api</p>
          <p>React</p>
          <p>Tailwind Css</p>
        </div>
        <div className="space-y-4 flex flex-col">
          <p className="font-bold"> Follow Us</p>
          <Link to="https://github.com/Tokle89/holidaze">Github Project</Link>
          <Link to="https://www.linkedin.com/in/fredrik-tokle-0994a023b/"> Fredrik Tokle</Link>
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;
