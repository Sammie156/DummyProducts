import { Routes, Route, Navigate, BrowserRouter as Router } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";
import SignInPage from "./pages/SignInPage";
import Navbar from "./components/Navbar";
import { isLoggedIn } from "./auth"; // should return true/false based on localStorage or JWT
import SignupPage from "./pages/SignUpPage";

function App() {
  return (
    <div>
      <Router>
        <Navbar title="Dummy_Products" />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/login"
            element={
              isLoggedIn() ? <Navigate to="/products" replace /> : <SignInPage />
            }
          />
          <Route
            path="/products"
            element={
              isLoggedIn() ? <ProductPage /> : <Navigate to="/login" replace />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<SignupPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
