import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../db/models/ProductType';

type ProductContextProps = {
    featuredProduct: Product | null;
    otherProducts: Product[];
};

export const ProductContext = createContext<ProductContextProps>({
    featuredProduct: null,
    otherProducts: [],
});

type ProductProviderProps = {
    children: ReactNode;
};

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);
    const [otherProducts, setOtherProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/api/products')
            .then(response => response.json())
            .then(data => {
                const fetchedProducts: Product[] = data.data;

                const featured = fetchedProducts.find((product) => product.featured);
                setFeaturedProduct(featured || null);

                const others = fetchedProducts.filter((product) => !product.featured);
                setOtherProducts(others);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                // FIXME: Optionally set an error state here to show an error message to the user
            });
    }, []);

    return (
        <ProductContext.Provider value={{ featuredProduct, otherProducts }}>
            {children}
        </ProductContext.Provider>
    );
};
