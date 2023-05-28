import React from 'react';

const ProductItem = ({ product }) => {
  return (
    <div className="product-item">
      <img src={product.image.src} alt={product.image.alt} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.category}</p>
        <p>{product.price}</p>
      </div>
      {/* You'll need to implement addProductToCart */}
      <button onClick={() => addProductToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductItem;
