import React from 'react';
import { Product } from '../db/models/ProductType';
import { truncateString } from '../helpers/stringHelpers';

type FeaturedProductProps = {
  product: Product | null,
  addProductToCart: (product: Product) => void;
};

const FeaturedProduct: React.FC<FeaturedProductProps> = ({ product, addProductToCart }) => {
  if (!product) return <p>Loading...</p>;

  return (
    <div className="jumbotron">
      <h2>{truncateString(product.name, 3)}</h2>
      <button className="add-to-card" onClick={() => addProductToCart(product)}>Add to Cart</button>
      <img src={product.image.src} alt={product.image.alt} className="img-fluid" />
      <p className="lead">{product.details.description}</p>
      <div className="product-info">
        <p>{product.category.join(', ')}</p>
        <p>{product.price}</p>
      </div>
    </div>
  );
};

export default FeaturedProduct;
