import React from 'react';
import { Product } from '../db/models/ProductType';

type FeaturedProductProps = {
  product: Product | null,
  addProductToCart: (product: Product) => void;
};

const FeaturedProduct: React.FC<FeaturedProductProps> = ({ product, addProductToCart }) => {
  if (!product) return <p>Loading...</p>;

  return (
    <div className="featured-product">
      <img src={product.image.src} alt={product.image.alt} />
      <div className="product-info">
        <h2>{product.name}</h2>
        <p>{product.category.join(', ')}</p>
        <p>{product.price}</p>
      </div>
      <button onClick={() => addProductToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default FeaturedProduct;
