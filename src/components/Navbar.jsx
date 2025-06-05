import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar(props) {
  return (
    <div className="navbar">
      <Link to="/">
        <div>
          <h2>{props.title}</h2>
        </div>
      </Link>
    </div>
  );
}

export default Navbar;
