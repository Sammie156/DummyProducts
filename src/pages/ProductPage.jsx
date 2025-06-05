import { useState, useEffect } from "react";
import Product from "../components/Product";
import "../index.css";

const URL = `https://dummyjson.com/products`;
let query = "";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleRemove(id) {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  }

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(`${URL}${query}`);
      if (!response.ok) console.error(`Could not Fetch: ${response.status}`);
      const data = await response.json();

      setProducts(data.products);
      console.log(data);
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
      onRemove={handleRemove}
      image={product.images}
      description={product.description}
      price={product.price}
      category={product.category}
    />
  ));

  const debounce = (fn, delay = 100) => {
    let timerID = null;

    return (...args) => {
      clearTimeout(timerID);
      timerID = setTimeout(() => fn(...args), delay);
    };
  };

  const onInput = debounce(makeAPICall, 500);

  function makeAPICall(event) {
    query = "/search?q=";
    query = query + event.target.value;

    fetchProducts();
  }

  return (
    <>
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

export default ProductPage;