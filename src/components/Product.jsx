import { IoMdCart } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

function Product(props) {
  return (
    <div className="bg-[#1e1f25] shadow-md transition-transform duration-100 hover:-translate-y-2 overflow-clip md:w-64 lg:w-100 min-h-80 rounded-lg">
      <div className="h-60 w-full overflow-hidden">
        <img
          src={props.image[0]}
          alt={props.name}
          className="object-contain w-full h-full"
        />
      </div>
      <div className="p-2 flex flex-col gap-2">
        <p className="text-2xl font-bold text-gray-100 h-20">{props.name}</p>
        <p className="text-sm text-[#fcd53f]">({props.rating} ⭐)</p>
        <p className="text-sm text-gray-500 h-20 overflow-auto">
          {props.description}
        </p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-[#efefef] text-lg font-bold">
            ${props.price}
          </span>
          <span className="text-xs text-[#fda045] uppercase font-semibold bg-[#181718] p-2 rounded-xl">
            {props.category}
          </span>
        </div>

        <div className="flex justify-between mt-4 gap-2">
          <div className="inline">
            <button
              type="button"
              className="bg-[#f9fbfc] uppercase text-md font-semibold hover:bg-[#50e72ad6] rounded-xl mt-4 py-3 px-5"
              onClick={() => console.log(`Added to Cart: ${props.name}`)
              }
            >
              <IoMdCart />
            </button>
          </div>
          <div className="inline">
            <button
              onClick={() => props.onRemove(props.id)}
              className="mt-4 py-3 px-3 text-sm bg-red-500 text-white rounded cursor-pointer hover:bg-red-600 transition"
            >
              <MdDeleteOutline />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
