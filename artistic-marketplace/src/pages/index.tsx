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
import Head from 'next/head'

const IndexPage = () => {
    const { featuredProduct, otherProducts, currentPage, changePage, totalProductPages } = useContext(ProductContext);

    const addProductToCart = (product: Product) => {
        console.log('Add to cart clicked:', product);
    };

    return (
        <>
            <Head>
                <title>Explore Artworks - Artistic Marketplace</title>
                <meta name="description" content="Browse through our diverse categories of images and artworks. Discover best sellers, featured products and add unique artworks to your cart." />
                <meta name="keywords" content="Explore Art, Browse Art, Artistic Marketplace, Buy Art, Online Art, Featured Art" />
            </Head>
            <Layout>
                <FeaturedProduct product={featuredProduct} />
                <hr />
                <div className={`row ${styles.filterBottonRow}`}>
                    <div className="col">
                        <Breadcrumb />
                    </div>
                    <div className="col d-flex justify-content-end mb-3">
                        <SortSelect />
                        <div className='d-block d-lg-none'>
                            <FilterButton />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3">
                        <div id="filterPanel" className="collapse d-lg-block">
                            <CategoryFilter />
                            <hr />
                            <PriceRangeFilter />
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <ProductGrid products={otherProducts} currentPage={currentPage} totalPages={totalProductPages} onPageChange={changePage} />
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default IndexPage;
