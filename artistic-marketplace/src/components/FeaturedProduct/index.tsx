import React from 'react';
import { Product } from '../../db/models/ProductType';
// import { truncateString } from '../../helpers/stringHelpers';
import styles from './styles.module.css';
import RelatedProducts from '../RelatedProducts';

type FeaturedProductProps = {
  product: Product | null;
  addProductToCart: (product: Product) => void;
};

const FeaturedProduct: React.FC<FeaturedProductProps> = ({ product, addProductToCart }) => {
  if (!product) return <p>Loading...</p>;

  return (
    <div className='jumbotron'>
      <div className='row my-3'>
        <div className='col-md-6'>
          <h1>{product.name}</h1>
        </div>
        <div className="col-md-6 text-end">
          <button className={`${styles.addToCard} ${styles.desktop} add-to-card desktop`} onClick={() => addProductToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
      <div className={styles.imageHolder}>
        <img
          src={product.image.src}
          alt={product.image.alt}
          className={`${styles.productImage} img-fluid`}
        />
        <div className={styles.photoOfTheDay}>
          <h3>Photo of the day</h3>
        </div>
      </div>
      <button className={`${styles.addToCard} ${styles.mobile} add-to-card mobile`} onClick={() => addProductToCart(product)}>
        Add to Cart
      </button>
      <div className='row my-3'>
        <div className='col-md-6'>
          <h3>About {product.name}</h3>
          <h3 className='grayText'>{product.category.join(', ')}</h3>
          <p className='grayText'>{product.details.description}</p>
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
