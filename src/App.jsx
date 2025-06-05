import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage"
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar
        title="Dummy_Products"
      />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<ProductPage />} />
      </Routes>
    </>
  )
}

export default App;