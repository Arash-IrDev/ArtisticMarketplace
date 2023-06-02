import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { Product } from '../../db/models/ProductType';
import styles from './ProductItem.module.css';
import { useRouter } from 'next/router';
import { CartContext } from '../../contexts/CartContext';

type ProductItemProps = {
  product: Product,
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const router = useRouter();
  const cartContext = useContext(CartContext);

  // Check if cartContext is defined
  if (!cartContext) {
    throw new Error("Cannot find CartContext"); // We can replace this with a default behavior or error handling
  }

  const { addToCart, cartItems } = cartContext;

  const handleAddToCartClick = () => {
    // Check if product is already in the cart
    const productInCart = cartItems.find(item => item._id === product._id);
    if (productInCart) {
      // Show a toast notification that the product is already in the cart
      toast.error('This product is already in your cart', {
        position: toast.POSITION.TOP_LEFT,
      });
      return;
    }
    addToCart(product);
    // Show a toast notification that the product has been added to the cart
    toast.success('Product added to cart successfully', {
      position: toast.POSITION.TOP_LEFT,
    });
  }

  const handleProductClick = () => {
    router.push(`/product/${product._id}`);
  }

  return (
    <div className="productItem">
      <div className={styles.imageHolder}>
        <div onClick={handleProductClick} className={styles.productImage} style={{ backgroundImage: `url(${product.image.src})` }}></div>
        <button className="add-to-cart" onClick={handleAddToCartClick}>Add to Cart</button>
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
