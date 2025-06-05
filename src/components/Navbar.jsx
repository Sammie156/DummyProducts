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
      <Link to="/products">
        <div className="product-link">
          <h2>Products</h2>
        </div>
      </Link>
    </div>
  );
}

export default Navbar;
