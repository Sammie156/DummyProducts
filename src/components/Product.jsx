import "../styles/Product.css";

function Product(props) {
  return (
    <>
      <div className="product-card">
        <div className="image-container">
          <img
            src={props.image[0]}
            alt={props.name}
            className="product-image"
          />
        </div>
        <div className="product-info">
          <h2 className="product-title">{props.name}</h2>
          <h2 className="product-price">${props.price}</h2>
          <p className="product-description">{props.description}</p>
          <div className="product-footer">
            <span className="product-category">{props.category}</span>
            <button
              type="button"
              className="remove-btn"
              onClick={() => props.onRemove(props.id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
