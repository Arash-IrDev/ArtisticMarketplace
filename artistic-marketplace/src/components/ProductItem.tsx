import React from 'react';
import { Product } from '../db/models/ProductType';

type ProductItemProps = {
  product: Product,
  addProductToCart: (product: Product) => void;
};

const ProductItem: React.FC<ProductItemProps> = ({ product, addProductToCart }) => {
  return (
    <div className="product-item">
      <img src={product.image.src} alt={product.image.alt} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.category.join(', ')}</p>
        <p>{product.price}</p>
      </div>
      <button onClick={() => addProductToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductItem;
