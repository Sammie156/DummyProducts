import { useState, useEffect } from "react";
import Product from "./components/Product";
import "./index.css";

const URL = "https://dummyjson.com/products";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch(URL);
        const data = await response.json();

        setProducts(data.products);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }
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
    const newProducts = products.filter((product) =>
      product.title.startsWith(event.target.value)
    );

    productsList = newProducts.map((product) => (
      <Product
        name={product.title}
        key={product.id}
        id={product.id}
        image={product.images[0]}
        price={product.price}
        category={product.category}
      />
    ));
  }

  return (
    <>
      <h1>Product Page</h1>
      <br />
      {/* <div class="search">
        <input type="text"
               placeholder="Search Items"
               size="30"
               className="search-bar"
               onChange={onInputChange}/>
        <button>Search</button>
      </div> */}
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
