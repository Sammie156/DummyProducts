import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";
import Navbar from "./components/Navbar";
import ConstructionPage from "./pages/ConstructionPage";

function App() {
  return (
    <>
      <Navbar title="Dummy_Products" />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/construction" element={<ConstructionPage />} />
      </Routes>
    </>
  );
}

export default App;
