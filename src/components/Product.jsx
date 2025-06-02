import '../styles/Product.css';

function Product(props) {
  return (
    <div class="product-card">
      <h3 class="product-name">{props.name}</h3>
      <p class="product-desc">{props.description}</p>

      <p class="product-price">${props.price}</p>
      <p class="product-cat">{props.category}</p>
    </div>
  );
}

export default Product;
