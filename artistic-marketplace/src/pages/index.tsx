import React from 'react';
import Layout from '../components/Layout';
import { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import FeaturedProduct from '../components/FeaturedProduct';
import ProductGrid from '../components/ProductGrid';
import { Product } from '../db/models/ProductType';
import FilterButton from '../components/ProductGrid/FilterButton';
import CategoryFilter from '../components/CategoryFilter';
import PriceRangeFilter from '../components/PriceRangeFilter';
import styles from './styles.module.css';
import Breadcrumb from '../components/ProductGrid/Breadcrumb';
import SortSelect from '../components/ProductGrid/SortSelect';
import Head from 'next/head';

const IndexPage = () => {
    const { featuredProduct, otherProducts, currentPage, changePage, totalProductPages } = useContext(ProductContext);

    // Function to handle adding a product to the cart
    const addProductToCart = (product: Product) => {
        console.log('Add to cart clicked:', product);
    };

    return (
        <>
            <Head>
                {/* Sets the title of the webpage */}
                <title>Explore Artworks - Artistic Marketplace</title>
                {/* Sets the meta description of the webpage */}
                <meta name="description" content="Browse through our diverse categories of images and artworks. Discover best sellers, featured products and add unique artworks to your cart." />
                {/* Sets the meta keywords of the webpage */}
                <meta name="keywords" content="Explore Art, Browse Art, Artistic Marketplace, Buy Art, Online Art, Featured Art" />
            </Head>
            <Layout>
                {/* Renders the featured product */}
                <FeaturedProduct product={featuredProduct} />
                <hr />
                <div className={`row ${styles.filterBottonRow}`}>
                    <div className="col">
                        {/* Renders the breadcrumb component */}
                        <Breadcrumb />
                    </div>
                    <div className="col d-flex justify-content-end mb-3">
                        {/* Renders the sort select component */}
                        <SortSelect />
                        <div className='d-block d-lg-none'>
                            {/* Renders the filter button component */}
                            <FilterButton />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3">
                        <div id="filterPanel" className="collapse d-lg-block">
                            {/* Renders the category filter component */}
                            <CategoryFilter />
                            <hr />
                            {/* Renders the price range filter component */}
                            <PriceRangeFilter />
                        </div>
                    </div>
                    <div className="col-lg-9">
                        {/* Renders the product grid component */}
                        <ProductGrid products={otherProducts} currentPage={currentPage} totalPages={totalProductPages} onPageChange={changePage} />
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default IndexPage;
