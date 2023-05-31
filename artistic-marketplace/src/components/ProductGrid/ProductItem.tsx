import React from 'react';
import { Product } from '../../db/models/ProductType';
import styles from './ProductItem.module.css';
import { useRouter } from 'next/router';

type ProductItemProps = {
  product: Product,
  addProductToCart: (product: Product) => void;
};

const ProductItem: React.FC<ProductItemProps> = ({ product, addProductToCart }) => {
  const router = useRouter();

  const handleProductClick = () => {
    router.push(`/product/${product._id}`);
  }

  return (
    <div className="productItem">
      <div className={styles.imageHolder}>
        <div onClick={handleProductClick} className={styles.productImage} style={{ backgroundImage: `url(${product.image.src})` }}></div>
        <button className="add-to-card" onClick={() => addProductToCart(product)}>Add to Cart</button>
      </div>
      <div className="product-info">
        <h3 className="grayText">{product.category.join(', ')}</h3>
        <h2 className="handCursor" onClick={handleProductClick}>{product.name}</h2>
        <p className="biggestFontSize">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductItem;
