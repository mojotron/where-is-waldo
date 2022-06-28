import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="">Levels</NavLink>
      <NavLink to="">Leader boards</NavLink>
    </nav>
  );
};

export default Navbar;
