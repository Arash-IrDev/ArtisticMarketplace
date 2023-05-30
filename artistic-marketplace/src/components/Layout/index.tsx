import { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import Header from '../Header';
import FeaturedProduct from '../FeaturedProduct';
import ProductGrid from '../ProductGrid';
import CategoryFilter from '../CategoryFilter';
import PriceRangeFilter from '../PriceRangeFilter';
import { Product } from '../../db/models/ProductType';
import { Archivo } from 'next/font/google'


const archivo = Archivo({ subsets: ['latin'] })

const Layout = () => {
    const { featuredProduct, otherProducts } = useContext(ProductContext);

    const addProductToCart = (product: Product) => {
        console.log('Add to cart clicked:', product);
    };

    return (
        <div className={archivo.className}>
                    <div className="container">
                        <Header />
                        <FeaturedProduct product={featuredProduct} addProductToCart={addProductToCart} />
                        <hr />
                        <div className="row">
                            <div className="col">
                                {/* <Breadcrumb /> */}
                            </div>
                            <div className="col d-flex justify-content-end">
                                {/* <SortButton /> */}
                                {/* <FilterButton /> */}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <CategoryFilter />
                                <hr />
                                <PriceRangeFilter />
                            </div>
                            <div className="col-9">
                                <ProductGrid products={otherProducts} addProductToCart={addProductToCart} currentPage={1} totalPages={5} onPageChange={page => console.log(page)} />
                            </div>
                        </div>
                    </div>
                </div>
    );
};

export default Layout;
