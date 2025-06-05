function Product(props) {
  return (
    <div className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden w-64">
      <div className="h-40 w-full overflow-hidden">
        <img
          src={props.image[0]}
          alt={props.name}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-bold text-gray-800 truncate">{props.name}</h2>
        <p className="text-sm text-gray-500 h-12 overflow-hidden">{props.description}</p>

        <div className="flex justify-between items-center mt-2">
          <span className="text-blue-600 font-semibold">${props.price}</span>
          <span className="text-xs text-gray-400 italic">{props.category}</span>
        </div>

        <button
          onClick={() => props.onRemove(props.id)}
          className="mt-4 py-1 px-3 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default Product;
