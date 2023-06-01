import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { Product } from '../../db/models/ProductType';
import Breadcrumb from '../ProductGrid/Breadcrumb';
import styles from './styles.module.css';
import RelatedProducts from '../RelatedProducts';
import { useRouter } from 'next/router';
import { CartContext } from '../../contexts/CartContext';
import Image from 'next/image';

type FeaturedProductProps = {
  product: Product | null;
};

const FeaturedProduct: React.FC<FeaturedProductProps> = ({ product }) => {
  const router = useRouter();
  const cartContext = useContext(CartContext);

  // check if cartContext is defined
  if (!cartContext) {
    throw new Error("Cannot find CartContext"); // we can replace this with a default behaviour or error handling
  }

  const { addToCart, cartItems } = cartContext;

  if (!product) return <p>Loading...</p>;

  const isProductDetailPage = router.pathname.includes('product');
 
  const handleAddToCartClick = () => {
    // check if product is already in the cart
    if (cartItems.find(item => item._id === product._id)) {
      // show a toast notification that the product is already in the cart
      toast.error('This product is already in your cart', {
        position: toast.POSITION.TOP_LEFT,
      });
      return;
    }
    addToCart(product);
    // show a toast notification that the product has been added to the cart
    toast.success('Product added to cart successfully', {
      position: toast.POSITION.TOP_LEFT,
    });
  }

  return (
    <div className='jumbotron'>
      <div className={`${styles.topRow} row my-3 `}>
        {isProductDetailPage && (
          <div className='col-12'>
            <Breadcrumb />
          </div>
        )}
        {!isProductDetailPage && (
          <>
            <div className='col-md-6 d-flex align-items-center'>
              <h1>{product.name}</h1>
            </div>
            <div className='col-md-6 text-end'>
              <button
                className={`${styles.addToCart} ${styles.desktop} add-to-cart desktop`}
                onClick={handleAddToCartClick}
              >
                Add to Cart
              </button>
            </div>
          </>
        )}
      </div>
      <div className={styles.imageHolder}>
        <Image
          loading={'eager'}
          width={product.details.dimensions.width}
          height={product.details.dimensions.height}
          src={product.image.src}
          alt={product.image.alt}
          className={`${styles.productImage}`}
        />
        <div className={`${styles.photoOfTheDay} ${isProductDetailPage ? 'd-none' : ''}`}>
          <h3>Photo of the day</h3>
        </div>
      </div>
      <button className={`${styles.addToCart} ${styles.mobile} add-to-cart mobile`} onClick={handleAddToCartClick}>
        Add to Cart
      </button>
      <div className='row my-3'>
        <div className='col-md-6'>
          {isProductDetailPage && (
            <h1>{product.name}</h1>
          )}
          {!isProductDetailPage && (
            <h3>About {product.name}</h3>
          )}
          <h3 className='grayText'>{product.category.join(', ')}</h3>
          <p className='grayText'>{product.details.description}</p>
          <div className={isProductDetailPage ? '' : 'd-none'}>
            <button className={`${styles.addToCart} ${styles.desktop} add-to-cart desktop`} onClick={handleAddToCartClick}>
              Add to Cart
            </button>
          </div>
        </div>
        <div className='col-md-6'>
          <div className='text-end'>
            <RelatedProducts productId={product._id} />
          </div>
          <div className='text-end'>
            <h3>Details</h3>
            <div className='product-info grayText'>
              <span>
                Dimensions: {product.details.dimensions.width} x {product.details.dimensions.height} pixel
              </span>
              <br />
              <span>Size: {product.details.size} kb</span>
              <br />
              <span>Price: ${product.price}</span>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
