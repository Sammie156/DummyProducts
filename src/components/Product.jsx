import { IoMdCart } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

function Product(props) {
  return (
    <div className="bg-gradient-to-br from-[#20222a] to-[#15161b] shadow-xl transition-transform duration-200 hover:-translate-y-2 hover:shadow-2xl overflow-clip md:w-64 lg:w-100 min-h-80 rounded-2xl border border-[#2f313b]">
      <div className="h-60 w-full bg-[#1a1b20] flex items-center justify-center overflow-hidden rounded-t-2xl">
        <img
          src={props.image[0]}
          alt={props.name}
          className="object-contain max-h-full max-w-full transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-4 flex flex-col gap-3 text-[#f1f2f3]">
        <p className="text-xl font-bold leading-snug line-clamp-2">{props.name}</p>
        <p className="text-sm text-yellow-400">({props.rating} ⭐)</p>
        <p className="text-sm text-gray-400 h-16 overflow-auto line-clamp-3">{props.description}</p>

        <div className="flex justify-between items-center mt-1">
          <span className="text-lg font-bold text-green-300">${props.price}</span>
          <span className="text-xs font-semibold uppercase bg-[#2d303a] text-[#fda045] px-3 py-1 rounded-full shadow-inner">
            {props.category}
          </span>
        </div>

        <div className="flex justify-between mt-3 gap-2">
          <button
            type="button"
            onClick={() => console.log(`Added to Cart: ${props.name}`)}
            className="flex items-center justify-center gap-1 bg-gradient-to-br from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-[#0c0e14] font-bold px-4 py-2 rounded-xl shadow-md transition"
          >
            <IoMdCart className="text-xl" />
          </button>

          <button
            onClick={() => props.onRemove(props.id)}
            className="flex items-center justify-center bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-3 py-2 rounded-xl shadow-md transition"
          >
            <MdDeleteOutline className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
