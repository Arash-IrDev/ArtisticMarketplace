import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../db/models/ProductType';

type ProductContextProps = {
    featuredProduct: Product | null;
    otherProducts: Product[];
    categories: string[];
    selectedCategories: string[];
    toggleCategory: (category: string) => void;
};

export const ProductContext = createContext<ProductContextProps>({
    featuredProduct: null,
    otherProducts: [],
    categories: [],
    selectedCategories: [],
    toggleCategory: () => { },
});

type ProductProviderProps = {
    children: ReactNode;
};

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);
    const [otherProducts, setOtherProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev => {
            if (prev.includes(category)) {
                return prev.filter(c => c !== category);
            } else {
                return [...prev, category];
            }
        });
    };

    useEffect(() => {
        fetch('/api/products')
            .then(response => response.json())
            .then(data => {
                
                const { products, categories } = data.data;

                setCategories(categories);

                const filteredProducts = products.filter((product: Product) => selectedCategories.length === 0 || product.category.some(cat => selectedCategories.includes(cat)));

                const featured = products.find((product: Product) => product.featured);
                setFeaturedProduct(featured || null);

                const others = filteredProducts.filter((product: Product) => !product.featured);
                setOtherProducts(others);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, [selectedCategories]);
    return (
        <ProductContext.Provider value={{ featuredProduct, otherProducts, categories, selectedCategories, toggleCategory }}>
            {children}
        </ProductContext.Provider>
    );
};
