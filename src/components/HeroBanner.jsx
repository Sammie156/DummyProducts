import { Link } from "react-router-dom";

function HeroBanner() {
  return (
    <>
      <div
        className="relative w-full h-screen
        bg-[url('https://images.pexels.com/photos/7195232/pexels-photo-7195232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] 
        bg-cover bg-center overflow-hidden transition
        hover:saturate-200"
      >
        <div className="absolute inset-0 bg-linear-to-b from-black from-0% to-transparent bg-opacity-50"/>
        <div className="relative z-10 flex flex-col place-items-center justify-center h-full px-4 text-center text-white">
          <div className="max-w-2xl">
            <div className="text-3xl md:text-7xl font-semibold mb-5">
              DUMMY PRODUCTS
            </div>
            <div className="text-2xl md:text-xl font-mono mb-6">
              Check out a list of dummy products
            </div>
            <div>
              <div className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition">
                <Link to="/products">
                  <button>Check Products</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroBanner;
