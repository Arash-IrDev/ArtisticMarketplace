import { useContext } from 'react';
import { useRouter } from 'next/router';
import { ProductContext } from '../../contexts/ProductContext';
import FeaturedProduct from '../../components/FeaturedProduct';
import { Product } from '../../db/models/ProductType';
import Layout from '../../components/Layout';
import Head from 'next/head'

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
        <>
            {product && (
                <Head>
                    <title>{product.name} - Artistic Marketplace</title>
                    <meta name="description" content={`Explore ${product.name}, a unique artwork in our ${product.category} category. Add this artwork to your collection today.`} />
                    <meta name="keywords" content={`${product.name}, ${product.category}, Artistic Marketplace, Buy Art`} />
                </Head>
            )}
            <Layout>
                <FeaturedProduct product={product} />
            </Layout>
        </>
    );
};

export default ProductDetailsPage;

