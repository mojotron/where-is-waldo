import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
    </nav>
  );
};

export default Navbar;
