import { Link } from "react-router-dom";

/**
 * Logo component that displays the Holidaze logo and links to the home page.
 * @returns {JSX.Element}
 * @example
 * <Logo />
 */

const Logo = () => (
  <Link to="/" className="text-[50px] font-ubuntu  ">
    Holidaze
  </Link>
);

export default Logo;
