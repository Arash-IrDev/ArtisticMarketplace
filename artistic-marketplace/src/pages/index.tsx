// import React, { useState, useEffect } from 'react';
// import ProductItem from '../components/ProductItem';
// import FeaturedProduct from '../components/FeaturedProduct';

// const IndexPage = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch('/api/products')
//       .then(response => response.json())
//       .then(data => setProducts(data));
//   }, []);

//   const featuredProduct = products.find(product => product.featured);
//   const otherProducts = products.filter(product => !product.featured);

//   return (
//     <div>
//       <FeaturedProduct product={featuredProduct} />
//       <div className="product-list">
//         {otherProducts.map(product => (
//           <ProductItem key={product._id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default IndexPage;
