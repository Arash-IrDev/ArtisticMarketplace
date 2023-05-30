import React from 'react';
import { Product } from '../../db/models/ProductType';
import styles from './ProductItem.module.css';
import { truncateString } from '../../helpers/stringHelpers';

type ProductItemProps = {
  product: Product,
  addProductToCart: (product: Product) => void;
};

const ProductItem: React.FC<ProductItemProps> = ({ product, addProductToCart }) => {
  return (
    <div className="product-item">
      {/* <img src={product.image.src} alt={product.image.alt} /> */}
      <div className={styles.productImage} style={{ backgroundImage: `url(${product.image.src})` }}></div>
      <button className="add-to-card" onClick={() => addProductToCart(product)}>Add to Cart</button>
      <div className="product-info">
        <h3 className="grayText">{product.category.join(', ')}</h3>
        <h2>{truncateString(product.name, 3)}</h2>
        <p className="biggestFontSize grayText">${product.price}</p>
      </div>
      
    </div>
  );
};

export default ProductItem;
