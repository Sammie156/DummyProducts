function Product(props) {
  return (
    <div className="bg-[#1e1f25] shadow-md transition-transform duration-100 hover:-translate-y-2 overflow-clip w-88 min-h-90 rounded-lg">
      <div className="h-60 w-full overflow-hidden">
        <img
          src={props.image[0]}
          alt={props.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-2 flex flex-col gap-2">
        <p className="text-xl font-bold text-gray-100">{props.name}</p>
        <p className="text-sm text-[#fcd53f]">({props.rating} ⭐)</p>
        <p className="text-sm text-gray-500 h-20 overflow-auto">{props.description}</p>

        <div className="flex justify-between items-center mt-2">
          <span className="text-[#efefef] text-lg font-bold">${props.price}</span>
          <span className="text-xs text-[#fda045] uppercase font-semibold bg-[#181718] p-2 rounded-xl">{props.category}</span>
        </div>

        <div className="flex justify-between mt-4 gap-2" onClick={() => alert("Bought!")}>
          <div className="inline"><button type="button" className="bg-[#4fe72a] text-sm rounded mt-4 py-1 px-3">Buy</button></div>
          <div className="inline">
            <button
              onClick={() => props.onRemove(props.id)}
              className="mt-4 py-1 px-3 text-sm bg-red-500 text-white rounded cursor-pointer hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
