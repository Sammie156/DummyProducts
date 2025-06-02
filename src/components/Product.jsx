import '../styles/Product.css';

function Product(props) {
  return (
    <div className="product-card">
      <h3 className="product-name">{props.name}</h3>
      <img className="product-image" src={props.image} alt={props.name} />
      <p className="product-desc">{props.description}</p>

      <p className="product-price">${props.price}</p>
      <p className="product-cat">{props.category}</p>
    </div>
  );
}

export default Product;
