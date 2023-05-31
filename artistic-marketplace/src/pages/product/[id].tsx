import { useContext } from 'react';
import { useRouter } from 'next/router';
import { ProductContext } from '../../contexts/ProductContext';
import FeaturedProduct from '../../components/FeaturedProduct';
import { Product } from '../../db/models/ProductType';
import Layout from '../../components/Layout';

const ProductDetailsPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { getProductById, allProducts } = useContext(ProductContext);
    const product = id ? getProductById(id as string) : null;

    // Basic ID validation - to be enhanced
    if (id && typeof id !== "string") {
        return <p>Invalid product ID.</p>;
    }

    // Error handling for non-existing product
    if (!product && allProducts.length !== 0) {
        return <p>The product could not be found.</p>;
    }

    if (!product || allProducts.length === 0) {
        return <p>Loading...</p>;
    }

    const addProductToCart = (product: Product) => {
        console.log('Add to cart clicked:', product);
    };

    return (
        <Layout>
        <FeaturedProduct product={product} addProductToCart={addProductToCart} />
        </Layout>
    );
};

export default ProductDetailsPage;

