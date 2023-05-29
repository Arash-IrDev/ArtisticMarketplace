import React, { useState, useEffect } from 'react';
import ProductItem from '../components/ProductItem';
import FeaturedProduct from '../components/FeaturedProduct';
import { Product } from '../db/models/ProductType';

const IndexPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => {
        // console.log('Received products:', data);
        setProducts(data.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        // FIXME: Optionally set an error state here to show an error message to the user
      });
  }, []);

  const addProductToCart = (product: Product) => {
    console.log('Add to cart clicked:', product);
  };

  const featuredProduct = Array.isArray(products) ? products.find(product => product.featured) ?? null : null;
  const otherProducts = Array.isArray(products) ? products.filter(product => !product.featured) : [];

  return (
    <div>
      <FeaturedProduct product={featuredProduct} addProductToCart={addProductToCart} />
      <div className="product-list">
        {otherProducts.map(product => (
          <ProductItem key={product._id} product={product} addProductToCart={addProductToCart} />
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
