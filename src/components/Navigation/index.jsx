import { NavLink } from "react-router-dom";

const Nav = () => (
  <nav className="h-[30px] flex gap-20">
    <NavLink to="/">Home</NavLink>
    <NavLink to="/">Venues</NavLink>
    <NavLink to="/">Become a host</NavLink>
  </nav>
);

export default Nav;
