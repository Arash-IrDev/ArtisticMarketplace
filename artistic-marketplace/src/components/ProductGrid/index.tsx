import React from 'react';
import ProductItem from './ProductItem';
import Pagination from './Pagination';
import { Product } from '../../db/models/ProductType';

type Props = {
    products: Product[],
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void,
}

const ProductGrid: React.FC<Props> = ({ products, currentPage, totalPages, onPageChange }) => {
    if (products.length === 0) {
        return <h3>No products found!</h3>;
    }

    return (
        <div className="product-grid">
            <div className="row gx-5">
                {products.map((product, index) => (
                    <div key={index} className="col-sm-12 col-md-6 col-lg-4">
                        <ProductItem product={product} />
                    </div>
                ))}
            </div>
            {totalPages > 0 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
            )}
        </div>
    );
};

export default ProductGrid;
