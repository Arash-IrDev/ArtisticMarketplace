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

const archivo = Archivo({ subsets: ['latin'] })

const Layout = () => {
    const { featuredProduct, otherProducts } = useContext(ProductContext);

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
                        {/* <Breadcrumb /> */}
                    </div>
                    <div className="col d-flex justify-content-end mb-3 d-block d-lg-none">
                        {/* <SortButton /> */}
                        <FilterButton />
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
                        <ProductGrid products={otherProducts} addProductToCart={addProductToCart} currentPage={1} totalPages={5} onPageChange={page => console.log(page)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;