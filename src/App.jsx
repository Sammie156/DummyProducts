import { useState, useEffect } from "react";
import Product from "./components/Product";
import "./index.css";
import Navbar from "./components/Navbar";

const URL = "https://dummyjson.com/products";
let query = "/";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(`${URL}${query}`);
      const data = await response.json();

      setProducts(data.products);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  let productsList = products.map((product) => (
    <Product
      name={product.title}
      key={product.id}
      id={product.id}
      image={product.images[0]}
      description={product.description}
      price={product.price}
      category={product.category}
    />
  ));

  function onInputChange(event) {
    query = "/search?q="
    query = query + event.target.value;

    fetchProducts();
  }

  return (
    <>
      <input type="text" placeholder="Search" onChange={onInputChange} />
      {loading ? (
        <div className="loader"></div>
      ) : (
        <span className="product-holder">
          {productsList.map((product) => product)}
        </span>
      )}
    </>
  );
}

export default App;
