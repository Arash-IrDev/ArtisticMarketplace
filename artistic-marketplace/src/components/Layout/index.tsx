// Layout component

import { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import Header from '../Header';
import FeaturedProduct from '../FeaturedProduct';
import ProductGrid from '../ProductGrid';
import { Product } from '../../db/models/ProductType';
import { Archivo } from 'next/font/google'
import FilterButton from '../ProductGrid/FilterButton';
import CategoryFilter from '../CategoryFilter';
import PriceRangeFilter from '../PriceRangeFilter';
import styles from './styles.module.css';
import Breadcrumb from '../ProductGrid/Breadcrumb';
import SortSelect from '../ProductGrid/SortSelect';

const archivo = Archivo({ subsets: ['latin'] })

const Layout = () => {
    const { featuredProduct, otherProducts, currentPage, changePage, totalProductPages } = useContext(ProductContext);

    const addProductToCart = (product: Product) => {
        console.log('Add to cart clicked:', product);
    };

    return (
        <div className={`${archivo.className} mb-5`}>
            <div className="container">
                <Header />
                <FeaturedProduct product={featuredProduct} addProductToCart={addProductToCart} />
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
                        <ProductGrid products={otherProducts} addProductToCart={addProductToCart} currentPage={currentPage} totalPages={totalProductPages} onPageChange={changePage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;