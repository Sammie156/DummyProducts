import { useState, useEffect } from "react";
import Product from "./components/Product";
import "./index.css";

const URL = "https://dummyjson.com/products";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => console.error("Fetching data error", error.message));
  }, []);

  const productsList = products.map(product => (
    <Product name={product.title} 
             key={product.id} 
             id={product.id}
             image={product.images[0]}
             description={product.description}
             price={product.price}
             category={product.category}/>
  ))

  return (
    <>
      <h1>Product Page</h1>
      <span class="product-holder">{productsList.map(product => product)}</span>
    </>
  );
}

export default App;
