import { useEffect, useState } from "react";

const URL = `https://dummyjson.com/products?limit=0`;

function ProductSlide() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(URL);
      const data = await res.json();

      const shuffled = data.products.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 10);

      setProducts([...selected, ...selected]);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <style>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-slide-custom {
          animation: slide 20s linear infinite;
        }
      `}</style>

      <div className="w-full overflow-hidden bg-gray-100 py-4">
        <div className="flex gap-6 px-4 whitespace-nowrap animate-slide-custom">
          {products.map((product, i) => (
            <div
              key={i}
              className="inline-block min-w-[220px] bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm font-bold truncate">{product.title}</h3>
                <p className="text-gray-600 text-sm truncate">{product.brand}</p>
                <p className="text-blue-600 font-semibold">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductSlide;
