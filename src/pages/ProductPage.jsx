import { useState, useEffect } from "react";
import Product from "../components/Product";

const URL = `https://dummyproducts.onrender.com/api`;

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  function handleRemove(id) {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  }

  async function fetchProducts(query = "") {
    try {
      setLoading(true);
      const response = await fetch(
        `${URL}/products?search=${encodeURIComponent(query)}`
      );
      if (!response.ok) console.error(`Could not Fetch: ${response.status}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts(searchTerm);
  }, [searchTerm]);

  const debounce = (fn, delay = 500) => {
    let timerID;
    return (...args) => {
      clearTimeout(timerID);
      timerID = setTimeout(() => fn(...args), delay);
    };
  };

  const makeAPICall = (event) => {
    setSearchTerm(event.target.value);
  };

  const onInput = debounce(makeAPICall, 500);

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
          className="inline bg-[#2d354d] text-2xl text-center text-[#ede3a5] px-2 sm:pb-10 rounded-2xl"
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
