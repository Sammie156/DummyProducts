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

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Product Gallery
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {products.map((product) => (
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
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductPage;
