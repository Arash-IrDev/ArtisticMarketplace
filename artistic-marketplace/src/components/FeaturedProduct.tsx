import React from 'react';

const FeaturedProduct = ({ product }) => {
  if (!product) return <p>Loading...</p>;

  return (
    <div className="featured-product">
      <img src={product.image.src} alt={product.image.alt} />
      <div className="product-info">
        <h2>{product.name}</h2>
        <p>{product.category}</p>
        <p>{product.price}</p>
      </div>
      {/* You'll need to implement addProductToCart */}
      <button onClick={() => addProductToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default FeaturedProduct;
