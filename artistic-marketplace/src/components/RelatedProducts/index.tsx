import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { Product } from '../../db/models/ProductType';
import styles from './styles.module.css';
import { useRouter } from 'next/router';

type RelatedProductsProps = {
    productId: string;
};

const RelatedProducts: React.FC<RelatedProductsProps> = ({ productId }) => {
    const { allProducts, getProductById } = useContext(ProductContext);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

    const router = useRouter();

    const handleProductClick = (product: Product) => {
        router.push(`/product/${product._id}`);
    };

    useEffect(() => {
        // Fetch related products based on the provided productId
        if (getProductById && allProducts.length > 0) {
            const product = getProductById(productId);

            if (product) {
                // Filter products with the same category as the current product, excluding itself
                const sameCategoryProducts = allProducts.filter(
                    (p) =>
                        p.category.some((cat) => product.category.includes(cat)) &&
                        p._id !== product._id
                );

                const selectedProducts: Product[] = [];

                // Select three random products from the same category
                while (
                    selectedProducts.length < 3 &&
                    sameCategoryProducts.length > 0
                ) {
                    const randomIndex = Math.floor(
                        Math.random() * sameCategoryProducts.length
                    );
                    selectedProducts.push(sameCategoryProducts[randomIndex]);
                    sameCategoryProducts.splice(randomIndex, 1); // Prevents the same product from being selected twice
                }

                setRelatedProducts(selectedProducts);
            }
        }
    }, [productId, allProducts, getProductById]);

    return (
        <div>
            <h3>People also buy</h3>
            <div className={`d-flex justify-content-end ${styles.productRow}`}>
                {relatedProducts.map((product) => (
                    <div
                        onClick={() => handleProductClick(product)} // Handle click event to navigate to the selected product
                        className={`${styles.thumbnail} handCursor`}
                        key={product._id}
                        style={{ backgroundImage: `url(${product.image.src})` }} // Set background image using the product's image source
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
