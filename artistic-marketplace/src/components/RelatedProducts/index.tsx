import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { Product } from '../../db/models/ProductType';
import styles from './styles.module.css';

type RelatedProductsProps = {
    productId: string;
};

const RelatedProducts: React.FC<RelatedProductsProps> = ({ productId }) => {
    const { allProducts, getProductById } = useContext(ProductContext);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

    useEffect(() => {
        if (getProductById && allProducts.length > 0) {
            const product = getProductById(productId);

            if (product) {
                const sameCategoryProducts = allProducts.filter(p => p.category.some(cat => product.category.includes(cat)) && p._id !== product._id);

                const selectedProducts: Product[] = [];

                while (selectedProducts.length < 3 && sameCategoryProducts.length > 0) {
                    const randomIndex = Math.floor(Math.random() * sameCategoryProducts.length);
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
                {relatedProducts.map(product => (
                    <div
                        className={styles.thumbnail}
                        key={product._id}
                        style={{ backgroundImage: `url(${product.image.src})` }}
                    >
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
