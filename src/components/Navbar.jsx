import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { isLoggedIn, logout } from "../auth";

function Navbar(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out....");
    
    logout();
    navigate("/login");
  };

  return (
     <nav className="bg-[#1b1d24] text-[#ede3a5] px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        {props.title}
      </Link>

      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/register" className="hover:underline">
          Signup
        </Link>
        {isLoggedIn() ? (
          <>
            <Link to="/products" className="hover:underline">
              Products
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
