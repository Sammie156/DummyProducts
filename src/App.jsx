import { useState, useEffect } from "react";
import Product from "./components/Product";
import "./index.css";

const URL = "https://dummyjson.com/products";
let query = "/";
const limit = "";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(`${URL}${query}${limit}`);
      if (!response.ok) 
        console.error(`Could not Fetch: ${response.status}`);
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
      image={product.images}
      description={product.description}
      price={product.price}
      category={product.category}
    />
  ));

  const debounce = (fn, delay=100) => {
    let timerID = null;

    return (...args) => {
      clearTimeout(timerID);
      timerID = setTimeout(() => fn(...args), delay);
    };
  };
  
  const onInput = debounce(makeAPICall, 500);

  function makeAPICall(event) {
    query = "/search?q="
    query = query + event.target.value;

    fetchProducts();
  }

  return (
    <>
      <input type="text" className="search-bar" placeholder="Search" onChange={onInput} />
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
