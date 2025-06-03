import '../styles/Product.css';

function Product(props) {
  
  return (
    <div className="product-card">
      <h3 className="product-name">{props.name}</h3>
      <div className="image-container">
        {props.image.map(image => (
          <img src={image} className='product-image'/>
        ))}
      </div>
      <p className="product-desc">{props.description}</p>

      <p className="product-price">${props.price}</p>
      <div>
        <p className="product-cat">Category: {props.category}</p>
      </div>
    </div>
  );
}

export default Product;
