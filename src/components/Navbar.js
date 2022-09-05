import { Link } from "react-router-dom";
import "./styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="Navbar">
      <h1>Where is Waldo</h1>
      <ul>
        <li>
          <Link to="/">levels</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
