import React from 'react';
import ProductItem from './ProductItem';
import Pagination from './Pagination';
import { Product } from '../../db/models/ProductType';

type Props = {
    products: Product[],
    addProductToCart: (product: Product) => void,
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void,
}

const ProductGrid: React.FC<Props> = ({ products, addProductToCart, currentPage, totalPages, onPageChange }) => {
    return (
        <div className="product-grid">
            <div className="row gx-5">
                {products.map((product, index) => (
                    <div key={index} className="col-sm-12 col-md-6 col-lg-4">
                        <ProductItem product={product} addProductToCart={addProductToCart} />
                    </div>
                ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
    );
};

export default ProductGrid;
