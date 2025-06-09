import { useState, useEffect } from "react";
import Product from "../components/Product";

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
      console.log(`${URL}${query}`);
      
      const response = await fetch(`${URL}${query}`);
      if (!response.ok) console.error(`Could not Fetch: ${response.status}`);
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
    <div className="min-h-screen bg-[#0c0e14] px-4 py-8">
      <div className="mb-5 justify-around grid grid-cols-1 sm:grid-cols-2">
        <h1 className="inline text-3xl font-bold text-center text-[#ede3a5]">
          Product Gallery
        </h1>
        <input
          type="text"
          onChange={onInput}
          size="40"
          placeholder="Search Items"
          className="inline bg-[#2d354d] text-[#ede3a5] px-2 rounded-2xl"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-5 justify-items-center">
          {products.map((product) => (
            <Product
              name={product.title}
              key={product.id}
              id={product.id}
              onRemove={handleRemove}
              image={product.images}
              rating={product.rating}
              description={product.description}
              price={product.price}
              category={product.category}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductPage;
